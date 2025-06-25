package com.itgate.ecommerce.controllers;

import com.itgate.ecommerce.models.Categorie;
import com.itgate.ecommerce.models.Client;
import com.itgate.ecommerce.models.Commande;
import com.itgate.ecommerce.models.Produit;
import com.itgate.ecommerce.repository.CategorieRepository;
import com.itgate.ecommerce.repository.ClientRepository;
import com.itgate.ecommerce.repository.CommandeRepository;
import com.itgate.ecommerce.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/commande")
public class CommandeController {
    @Autowired
    private CommandeRepository commandeRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ProduitRepository produitRepository;
    @GetMapping("/all")
    public List<Commande> getallCommande(){
        return commandeRepository.findAll();
    }

//    @PostMapping("/ajouter")
//    public Commande ajouterCommande(@RequestBody Commande commande){
//        return commandeRepository.save(commande);
//    }

/*    @PostMapping("/ajouter/{id_client}")
    public Commande ajouterCommande(@RequestBody Commande commande,@RequestParam List<Long> ids,@PathVariable Long id_client){
        for (int i=0; i<ids.size();i++){
            Produit p = produitRepository.findById(ids.get(i)).get();
            commande.ajouterproduit(p);
        }

        Client c = clientRepository.findById(id_client).get();
        commande.setClient(c);
        return commandeRepository.save(commande);
    }*/

    @PostMapping("/ajouter/{id_client}")
    public Commande ajouterCommande(@RequestBody Commande commande,@PathVariable Long id_client){


        Client c = clientRepository.findById(id_client).get();
        commande.setClient(c);
        return commandeRepository.save(commande);
    }
    @GetMapping("/getone/{id}")
    public Commande getoneCommande(@PathVariable Long id){
        return commandeRepository.findById(id).get();
    }

    @PutMapping("/maj/{id}")
    public Commande majCommande(@PathVariable Long id,@RequestBody Commande c){
        Commande c1=commandeRepository.findById(id).get();
        if(c1!=null){
            c.setId(id);
            c.setClient(c1.getClient());
            return commandeRepository.saveAndFlush(c);
        }
        else{
            throw new RuntimeException("Echec !");
        }

    }

    @DeleteMapping("/supprimer/{id}")
    public HashMap<String,String> supprimerCommande(@PathVariable Long id){
        HashMap<String,String> message=new HashMap<>();
        try {
            commandeRepository.deleteById(id);
            message.put("Etat : ","La commande a été supprimé");
        }
        catch(Exception e){
            message.put("Etat : ","La commande n'a pas été supprimé");
        }
        return message;
    }

}
