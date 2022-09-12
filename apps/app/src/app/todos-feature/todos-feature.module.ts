import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template';
import { PanelUiModule } from '../panel-ui';
import { SidebarUiModule } from '../sidebar-ui';
import { DescriptionPanelComponent } from './description-panel.component';
import { TodosPageComponent } from './todos-page.component';

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    LetModule,

    PanelUiModule,
    SidebarUiModule,

    RouterModule.forChild([
      {
        path: ':todoId',
        pathMatch: 'full',
        component: TodosPageComponent,
      },
      { path: '**', redirectTo: '/1' },
    ]),
  ],
  declarations: [TodosPageComponent, DescriptionPanelComponent],
})
export class TodosFeatureModule {}
