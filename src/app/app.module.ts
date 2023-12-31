import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { AzureAdDemoService } from './azure-ad-demo.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AudioLibraryModule } from 'projects/audio-library/src/public-api';
import { PrintModule } from 'projects/print/src/public-api';
import { VoiceRecorderComponent } from './voice-recorder/voice-recorder.component';
import { GetEntriesComponent } from './get-entries/get-entries.component';
import { ModalCompleteAnalysisComponent } from './modal-complete-analysis/modal-complete-analysis.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VoiceRecorderComponent,
    GetEntriesComponent,
    ModalCompleteAnalysisComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    AudioLibraryModule,
    PrintModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth: {
            clientId: "eea97fa2-b2fe-4d4e-9ad1-4c7f96b755cc",
            redirectUri: "http://localhost:4200",
            authority:"https://login.microsoftonline.com/6ba0b651-eb6c-40de-90bf-b1e0434967f6"
          },
          cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: false
          }
        }
      ),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map(
          [
            ['https://graph.microsoft.com/v1.0/me', ['user.Read']]
          ]
        )
      }
      )
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi:true,
  }, MsalGuard, AzureAdDemoService
],
  bootstrap: [AppComponent,
     MsalRedirectComponent
    ]
})
export class AppModule { }
