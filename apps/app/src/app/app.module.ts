import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RouterStoreModule } from './router-store';
import { SidebarUiModule } from './sidebar-ui';

@NgModule({
  imports: [
    BrowserModule,

    SidebarUiModule,

    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./todos-feature').then((m) => m.TodosFeatureModule),
      },
    ]),

    StoreModule.forRoot({}),
    RouterStoreModule,
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
