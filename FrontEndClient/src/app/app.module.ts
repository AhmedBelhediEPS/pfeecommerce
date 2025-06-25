import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {  HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListproductComponent } from './components/listproduct/listproduct.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailcartComponent } from './components/detailcart/detailcart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ContactComponent } from './components/contact/contact.component';
import { ListproductbysubcatComponent } from './components/listproductbysubcat/listproductbysubcat.component';
import { FactureComponent } from './components/facture/facture.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { InvoicedetailComponent } from './components/invoicedetail/invoicedetail.component';

import { NgbPaginationModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchproductPipe } from './pipes/searchproduct.pipe';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatDialogModule } from '@angular/material/dialog';
import { ProviderComponent } from './components/provider/provider.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
    ListproductComponent,
    DetailproductComponent,
    LoginComponent,
    ProfileComponent,
    DetailcartComponent,
    CheckoutComponent,
    EditprofileComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    ChangepasswordComponent,
    ContactComponent,
    ListproductbysubcatComponent,
    FactureComponent,
    InvoicesComponent,
    InvoicedetailComponent,
    SearchproductPipe,
    WishlistComponent,
    ProviderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng5SliderModule,
    NgbRatingModule,
    NgbModule,
    NgbPaginationModule,
    BrowserAnimationsModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
