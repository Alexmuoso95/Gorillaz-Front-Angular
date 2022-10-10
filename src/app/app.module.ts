import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localES from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientService } from './clients/client.service';
import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clients/form.component';
import { FormsModule } from '@angular/forms'; 

import { registerLocaleData} from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { LoginComponent } from './users/login.component';
registerLocaleData(localES,'es');

const routes: Routes = [
  {path: '' , redirectTo: '/menu', pathMatch: 'full'},
  //{path: 'clients', component: ClientsComponent},
  {path: 'clients/page/:page', component: ClientsComponent},
  {path: 'clients/form', component: FormComponent},
  {path: 'clients/form/:id', component: FormComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientsComponent,
    FormComponent,
    PaginatorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClientService, {provide : LOCALE_ID , useValue : 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
