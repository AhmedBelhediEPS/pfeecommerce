package com.itgate.ecommerce.controllers;

import com.itgate.ecommerce.models.*;
import com.itgate.ecommerce.repository.ClientRepository;
import com.itgate.ecommerce.repository.CommandeProduitRepository;
import com.itgate.ecommerce.repository.CommandeRepository;
import com.itgate.ecommerce.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/commandeproduit")
public class CommandeProduitController {

    @Autowired
    private CommandeProduitRepository commandeProduitRepository;

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private ProduitRepository produitRepository;
    @PostMapping("/ajouter/{id_produit}/{id_commande}")
    public CommandeProduit ajouterSouscategorie(@RequestBody CommandeProduit commandeProduit, @PathVariable Long id_produit,@PathVariable Long id_commande){
        Produit c = produitRepository.findById(id_produit).get();
        commandeProduit.setProduit(c);

        Commande com = commandeRepository.findById(id_commande).get();
        commandeProduit.setCommande(com);
        return commandeProduitRepository.save(commandeProduit);
    }
}
