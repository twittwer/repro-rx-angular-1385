import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-sidebar></app-sidebar>
  `,
})
export class AppComponent {}
