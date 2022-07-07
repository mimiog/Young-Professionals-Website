const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { stringify } = require('querystring');

require('dotenv').config();

const port = process.env.PORT || 3000;
const dbUri = process.env.DATABASE_URI;
const client = new MongoClient(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true, serverApi: ServerApiVersion.v1
});

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const info = {
    firstName: String,
    lastname: String,
    email: String,
    phoneNo: Number,
    campus: String,
    workshop: String
}

//create GET API Routes
app.get('/inquiries', async (req, res) => {
    const collection = client.db('Project').collection('inquiry');
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
});

// create POST API Route
app.post('/inquiries', async (req, res) => {
    const data = {
        ...req.body,
        isCompleted: false,
        createdAt: new Date().toLocaleString(),
        firstName: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        campus: req.body.campus,
        workshop: req.body.workshop
    };
    const collection = client.db('Project').collection('inquiry');
    try {
        await collection.insertOne(data);
        console.log(req.body);
    } catch (error) {
        console.log(error.message)
    }
    res.status(201).json({ message: 'Success' });

    // check if completed 
    if (!data.isCompleted){
        return true;
    } else {
        return false;
    }
});

// create reusable transporter object using the default SMTP transport
// I used ethereal to generate a fake email
let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'foiimziazzczszou@ethereal.email', // generated ethereal user
        pass: 'VDy1u6a76H4HSKGKUJ'  // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"TU Young Professionals" <foiimziazzczszou@ethereal.email>',
    to: "moguny1@students.towson.edu",
    subject: "TU Young Professionals Info Form",
    text: "Thank you for your interest in our workshops! A member of our team will reach out soon.",
    html: "<h4>Thank you for your interest in our workshops! A member of our team will reach out soon.</h4>"
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});


// catch-all route
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);


    //
    client.connect(err => {
        if (err) {
            console.log('Oops, error connecting to database...', err.message);
            return;
        }
        console.log('Connected to database successfully');
    });
});


// gracefully close DB connection
const cleanup = (event) => {
    console.log('Database connection closed.');
    client.close();
    process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);