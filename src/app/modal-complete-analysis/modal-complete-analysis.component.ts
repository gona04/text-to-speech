import { Component, OnInit } from '@angular/core';
import { DairyEntriesService } from '../dairy-entries.service';


@Component({
  selector: 'app-modal-complete-analysis',
  templateUrl: './modal-complete-analysis.component.html',
  styleUrls: ['./modal-complete-analysis.component.css']
})
export class ModalCompleteAnalysisComponent implements OnInit {

  data: any;
  constructor(private _diaryEntryServices :DairyEntriesService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._diaryEntryServices.getAnalysisData().subscribe(data => {
      this.data = data;
      console.log(data)
    })
  }

  printPage() {
    window.print();
  }

  close(){
    this._diaryEntryServices.setAnalysisModalView(false);
  }
}
