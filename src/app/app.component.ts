import { Component, OnInit } from '@angular/core';
import { AzureAdDemoService } from './azure-ad-demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isUserLoggedIn: boolean = false;

  constructor(private azureADDemoService: AzureAdDemoService) {
  }
  ngOnInit(): void {
    this.azureADDemoService.isUserLoggedIn.subscribe(x => {
      this.isUserLoggedIn = x
    })
  }

}
