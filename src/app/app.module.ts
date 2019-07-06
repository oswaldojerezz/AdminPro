import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { PAGES_ROUTES } from './app.routes';

// Components Login
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Components Pages
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';

// Modulos
import { ServiceModule } from './services/service.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
   ],
  imports: [
    BrowserModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
