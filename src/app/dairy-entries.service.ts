import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DairyEntriesService {

  constructor(private http: HttpClient) { }

  getDairyEntries() {
    return this.http.get("http://localhost:5103/api/ConvertedText")
  }
}
