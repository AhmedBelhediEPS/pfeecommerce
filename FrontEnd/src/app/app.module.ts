import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListproductComponent } from './components/listproduct/listproduct.component';
import {  HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ListcategoryComponent } from './components/listcategory/listcategory.component';
import { ListsubcategoryComponent } from './components/listsubcategory/listsubcategory.component';
import { ListorderComponent } from './components/listorder/listorder.component';
import { DetailorderComponent } from './components/detailorder/detailorder.component';
import { ListcustomerComponent } from './components/listcustomer/listcustomer.component';
import { ListproviderComponent } from './components/listprovider/listprovider.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { SearchorderPipe } from './pipes/searchorder.pipe';
import { SearchproductPipe } from './pipes/searchproduct.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    LayoutComponent,
    FooterComponent,
    ListproductComponent,
    DetailproductComponent,
    AddproductComponent,
    ListcategoryComponent,
    ListsubcategoryComponent,
    ListorderComponent,
    DetailorderComponent,
    ListcustomerComponent,
    ListproviderComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    ForgetpasswordComponent,
    SearchorderPipe,
    SearchproductPipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
