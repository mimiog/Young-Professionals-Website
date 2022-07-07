import { Component, OnInit } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-form',
  templateUrl: './infoForm.component.html',
  styleUrls: ['./infoForm.component.css'],
})
export class InfoFormComponent implements OnInit {
  constructor(private dataService: DataService) {
    this.dataService.getInquiries().subscribe((data) => {
      console.log('RESULT FROM THE API:', data);
    });
  }

  infoForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNo: new FormControl('', Validators.required),
    campus: new FormControl('', Validators.required),
    workshop: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

 
  onSubmit(form: NgForm) {

    if (!form.valid) {
      alert(
        'Please ensure you enter a valid email address and fill all required fields'
      );
    } else {
      this.dataService.submitInquiries(form.value);
      form.reset();
      
    }
  }
}
