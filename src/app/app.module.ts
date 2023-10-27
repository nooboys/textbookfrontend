import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { metaReducers } from './app.meta-reducer';
import { appReducers } from './app.reducer';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  BadgeModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  TabsModule,
  UtilitiesModule,
  NavbarModule,
  CollapseModule,
  CollapseDirective,
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { AvatarModule } from 'ngx-avatars';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers, { metaReducers: metaReducers }),
    HttpClientModule,
    AvatarModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NavbarModule,
    CollapseModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    IconSetService,
    BsModalService,
    CollapseDirective,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
