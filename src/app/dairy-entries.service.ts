import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DairyEntries } from './models/diaryEntries';

@Injectable({
  providedIn: 'root'
})
export class DairyEntriesService {

  showModal: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  modalModal: BehaviorSubject<Object> = new BehaviorSubject<Object>({});

  entriesURL:string = "http://localhost:5103/api/ConvertedText";

  constructor(private http: HttpClient) { }

  getDairyEntries() {
    return this.http.get(this.entriesURL)
  }

  getCompleteAnalysis(): Observable<any> {
    const userDetails = { "userName": "goonja" };
    return this.http.post<any>( this.entriesURL +'user-details', userDetails);
  }

  setAnalysisModalView(shouldShow: boolean,  diaryEntries?: Object) {
    this.showModal.next(shouldShow);
    if(diaryEntries !== undefined) {
      this.modalModal.next(diaryEntries);
    }
  }

  getAnalysisModal() {
    return this.showModal.asObservable();
  }

  getAnalysisData() {
    return this.modalModal.asObservable();
  }
}
