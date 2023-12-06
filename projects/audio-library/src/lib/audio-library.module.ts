import { NgModule } from '@angular/core';
import { AudioLibraryComponent } from './audio-library.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AudioLibraryComponent
  ],
  imports: [
    AngularEditorModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    AudioLibraryComponent
  ]
})
export class AudioLibraryModule { }
