import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { DetailorderComponent } from './components/detailorder/detailorder.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListcategoryComponent } from './components/listcategory/listcategory.component';
import { ListcustomerComponent } from './components/listcustomer/listcustomer.component';
import { ListorderComponent } from './components/listorder/listorder.component';
import { ListproductComponent } from './components/listproduct/listproduct.component';
import { ListproviderComponent } from './components/listprovider/listprovider.component';
import { ListsubcategoryComponent } from './components/listsubcategory/listsubcategory.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {path:'',component:LoginComponent},
  


  {path:'home',canActivate:[AuthGuard],component:HomeComponent,children:[
    {path:'',component:LayoutComponent},
    {path:'listproduct',component:ListproductComponent},
    {path:'detailproduct/:id',component:DetailproductComponent},
    {path:'addproduct',component:AddproductComponent},
    {path:'listcategory',component:ListcategoryComponent},
    {path:'listsubcategory',component:ListsubcategoryComponent},
    {path:'listorder',component:ListorderComponent},
    {path:'detailorder/:id',component:DetailorderComponent},
    {path:'listcustomer',component:ListcustomerComponent},
    {path:'listprovider',component:ListproviderComponent},
    {path:'profile',component:ProfileComponent}
  ]},

  {path:'register',component:RegisterComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'resetpassword/:resettoken',component:ResetpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
