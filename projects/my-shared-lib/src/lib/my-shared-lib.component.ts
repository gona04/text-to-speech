import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-my-shared-lib',
  template: `
    <p>
      my-shared-lib works!
    </p>
  `,
  styles: [
  ]
})
export class MySharedLibComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
