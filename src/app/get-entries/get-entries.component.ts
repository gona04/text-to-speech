import { Component, OnInit } from '@angular/core';
import { DairyEntriesService } from '../dairy-entries.service';
import { DairyEntries } from '../models/diaryEntries';

@Component({
  selector: 'app-get-entries',
  templateUrl: './get-entries.component.html',
  styleUrls: ['./get-entries.component.css']
})
export class GetEntriesComponent implements OnInit {
  diaryEntries: DairyEntries[] = [];
  showModal = false;
  constructor(private _diaryEntriesServices: DairyEntriesService) { }

  ngOnInit(): void {
    this.getAllEntries()
  }

  getAllEntries() {
    this._diaryEntriesServices.getDairyEntries()
      .subscribe((result: any) => {
        console.dir(result);
        this.diaryEntries = result;
        this.diaryEntries.map(e => {
          let date = new Date(e.createdAt);

          // Format date
          e.createdAt = date.toLocaleDateString('en-CA', {
            weekday: 'long',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });

          // Format time in 12-hour format
          e.createdAtTime = date.toLocaleTimeString('en-CA', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        })
      })
  }

  getTheAnalysis() {
    this._diaryEntriesServices.getCompleteAnalysis().subscribe(
      response => {
        this._diaryEntriesServices.setAnalysisModalView(true, response)
        // Handle success
        console.log(response);
      },
      error => {
        // Handle error
        console.error(error);

        // Check if the error has details
        if (error.error && error.error.errors) {
          // Log validation errors
          console.error("Validation Errors:", error.error.errors);
        }
      }
    );
  }


}
