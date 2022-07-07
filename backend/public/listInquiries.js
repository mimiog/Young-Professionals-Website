async function getAllInquiries() {
    const response = await fetch('/inquiries');
    const data = await response.json();

    // do something with the data
    const tableContent = document.getElementById('table-content');

    //create a loop to loop through the data and create table row for each entry
    for (const item of data) {
        tableContent.innerHTML += `
            <tr>
                <td>${item.createdAt}</td>
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>${item.email}</td>
                <td>${item.phoneNo}</td>
                <td>${item.campus}</td>
                <td>${item.workshop}</td> 
                <td>${item.isCompleted}</td>             
            </tr>
        `;
    }

}