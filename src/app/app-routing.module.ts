import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoiceRecorderComponent } from './voice-recorder/voice-recorder.component';
import { MsalGuard } from '@azure/msal-angular';
import { GetEntriesComponent } from './get-entries/get-entries.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: VoiceRecorderComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'get-entries',
    component: GetEntriesComponent,
    canActivate: [MsalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
