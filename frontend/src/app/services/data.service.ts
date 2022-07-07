import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = environment.apiServer;
  constructor(private http: HttpClient) {}

  getInquiries() {
    return this.http.get(this.apiUrl);
  }

  submitInquiries(item: any) {
    this.http.post(this.apiUrl, item).subscribe();
  }
}
