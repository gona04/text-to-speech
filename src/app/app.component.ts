import { Component, OnInit } from '@angular/core';
import { AzureAdDemoService } from './azure-ad-demo.service';
import { DairyEntriesService } from './dairy-entries.service';
import { AudioLibraryService } from 'projects/audio-library/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showModal: any = false;
  isUserLoggedIn: boolean = false;

  constructor(private _azureADDemoService: AzureAdDemoService, private _overallAnalysis: DairyEntriesService, private audioLibraryServices: AudioLibraryService) {
  }
  ngOnInit(): void {
    this._azureADDemoService.isUserLoggedIn.subscribe(x => {
      this.isUserLoggedIn = x
    })
    this.getCurrentStatusOfModal()
  }

  getCurrentStatusOfModal() {
    this._overallAnalysis.getAnalysisModal().subscribe(result => {
     this.showModal = result;
    })
  }


}
