package com.itgate.ecommerce.controllers;

import com.itgate.ecommerce.models.Subscribers;
import com.itgate.ecommerce.repository.SubscribersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/subscribers")
public class SubscribersController {
    @Autowired
    private SubscribersRepository subscribersRepository;

    @PostMapping("/ajouter")
    public ResponseEntity<String> subscribe(@RequestBody Subscribers subscribers) {
        String email = subscribers.getEmail();

        if (isValidEmailFormat(email)) {
            subscribers.setEmail(email.toLowerCase()); // Convertir en minuscules
            subscribersRepository.save(subscribers);
            return ResponseEntity.ok("Subscription successful!");
        } else {
            return ResponseEntity.badRequest().body("Invalid email format");
        }
    }

    private boolean isValidEmailFormat(String email) {
        String regex = "^[a-zA-Z0-9]+@[a-zA-Z]{2,}\\.[a-zA-Z]{2,}$";
        return email.matches(regex);
    }


}


