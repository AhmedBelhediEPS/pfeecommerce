import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailcartComponent } from './components/detailcart/detailcart.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { FactureComponent } from './components/facture/facture.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { HomeComponent } from './components/home/home.component';
import { InvoicedetailComponent } from './components/invoicedetail/invoicedetail.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListproductComponent } from './components/listproduct/listproduct.component';
import { ListproductbysubcatComponent } from './components/listproductbysubcat/listproductbysubcat.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProviderComponent } from './components/provider/provider.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';


const routes: Routes = [

  {path:'',component:LoginComponent},

{path:'',component:HomeComponent,children:[


  {path:'home',component:LayoutComponent},
  {path:'listproduct',component:ListproductComponent},
  {path:'detailproduct/:id',component:DetailproductComponent},
  {path:'profile',component:ProfileComponent},
  {path:'detailcart',component:DetailcartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'editprofile',component:EditprofileComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'resetpassword/:resettoken',component:ResetpasswordComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'contact',component:ContactComponent},
  {path:'listproductbysubcat/:id',component:ListproductbysubcatComponent},
  {path:'facture/:id',component:FactureComponent},
  {path:'invoices',component:InvoicesComponent},
  {path:'invoicedetail/:id',component:InvoicedetailComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'provider',component:ProviderComponent},


]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
