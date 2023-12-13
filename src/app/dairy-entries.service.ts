import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DairyEntriesService {

  constructor(private http: HttpClient) { }

  getDairyEntries() {
    return this.http.get("http://localhost:5103/api/ConvertedText")
  }

  getCompleteAnalysis(): Observable<any> {
   let userDetails = { "userName": "goonja"};
    return this.http.post<any>('http://localhost:5103/api/ConvertedText/user-details', userDetails);
  }

}
