import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-print',
  template: `
    <p>
      print works!
    </p>
  `,
  styles: [
    './print.component.css'
  ]
})
export class PrintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
