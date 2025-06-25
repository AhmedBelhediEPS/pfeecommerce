package com.itgate.ecommerce.controllers;


import com.itgate.ecommerce.models.Categorie;
import com.itgate.ecommerce.models.Contact;
import com.itgate.ecommerce.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/contact")
public class ContactController {
    @Autowired
    private ContactRepository contactRepository;



    @GetMapping("/all")
    public List<Contact> getallContact(){
        return contactRepository.findAll();
    }

    @PostMapping("/ajouter")
    public Contact ajouterContact(@RequestBody Contact contact){



        return contactRepository.save(contact);
    }

    @GetMapping("/getone/{id}")
    public Contact getoneContact(@PathVariable Long id){
        return contactRepository.findById(id).get();
    }



    @DeleteMapping("/supprimer/{id}")
    public HashMap<String,String> supprimerContact(@PathVariable Long id){
        HashMap<String,String> message=new HashMap<>();
        try {
            contactRepository.deleteById(id);
            message.put("Etat : ","Suppression avec succées!");
        }
        catch(Exception e){
            message.put("Etat : ","Suppression échouée!");
        }
        return message;
    }


}
