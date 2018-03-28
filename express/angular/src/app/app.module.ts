import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }         from './app.component';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import {MyHttpInterceptor} from './my-http-interceptor';
import { DiagnosticToolsComponent } from "./diagnostic-tools/diagnostic-tools.component";
import { TranslatedUrlComponent } from "./diagnostic-tools/translated-url/translated-url.component";
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgProgressModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    DiagnosticToolsComponent,
    TranslatedUrlComponent
  ],
  providers: [
    { provide: MyHttpInterceptor,  useClass: MyHttpInterceptor, multi: true }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
