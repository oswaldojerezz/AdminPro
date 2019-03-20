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
import { ServiceModule } from './services/service.module';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
   ],
  imports: [
    BrowserModule,
    PAGES_ROUTES,
    PagesModule,
    FormsModule,
    ServiceModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
