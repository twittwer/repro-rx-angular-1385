import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { SidebarDirective } from './sidebar.directive';

const DECLARATIONS = [
  // prettier-ignore
  SidebarComponent,
  SidebarDirective,
];

@NgModule({
  imports: [CommonModule],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class SidebarUiModule {}
