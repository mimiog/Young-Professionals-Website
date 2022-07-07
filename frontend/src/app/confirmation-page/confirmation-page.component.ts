import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {

  data: Observable<any>;
  constructor(private dataService: DataService) {
    this.data = this.dataService.getInquiries();
    
   }

  ngOnInit(): void {
  }
}
