import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { PAGES_ROUTES } from './app.routes';

// Components Login
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Components Pages
import { AppComponent } from './app.component';

// Modulos
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PAGES_ROUTES,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
