import { Component } from '@angular/core';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
email: string;
emailForm: FormGroup;

success:boolean=false;



constructor(private newsletterservice:NewsletterService,private formBuilder: FormBuilder){
  this.emailForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+@[a-zA-Z]{2,}\\.[a-zA-Z]{2,}$")]]
  });
}



// subscribe() {
//   this.newsletterservice.subscribe(this.email)
//     .subscribe(response => {
//       console.log(response);
//       // Réinitialiser le formulaire ou afficher un message de succès ici
//     }, error => {
//       console.error(error);
//       // Gérer les erreurs ici
//     });
// }


subscribee() {

  if (this.emailForm.valid) {
    const emailControl = this.emailForm.get('email');
    if (emailControl) { // Vérification de nullité
      const email = emailControl.value;
      this.newsletterservice.subscribe(email).subscribe(
        response => {
          console.log('Subscription successful:', response);
          // Afficher un message de succès à l'utilisateur si nécessaire
          
        },
        error => {
          console.error('Subscription error:', error);
          // Gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
        }
      );
    }
  }

  this.success=true;
  setTimeout(() => {
    this.success = false;
  }, 3000);
  this.emailForm.reset();
  
}



}
