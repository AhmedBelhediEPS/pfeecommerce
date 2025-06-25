package com.itgate.ecommerce.controllers;


import com.itgate.ecommerce.models.Categorie;
import com.itgate.ecommerce.models.Souscategorie;

import com.itgate.ecommerce.repository.CategorieRepository;
import com.itgate.ecommerce.repository.SouscategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/souscategorie")
public class SouscategorieController {

    @Autowired
    private SouscategorieRepository souscategorieRepository;
    @Autowired
    private CategorieRepository categorieRepository;

    @GetMapping("/all")
    public List<Souscategorie> getallSouscategorie(){
        return souscategorieRepository.findAll();
    }

    @PostMapping("/ajouter/{id_categorie}")
    public Souscategorie ajouterSouscategorie(@RequestBody Souscategorie souscategorie,@PathVariable Long id_categorie){
        Categorie c = categorieRepository.findById(id_categorie).get();
        souscategorie.setCategorie(c);
        return souscategorieRepository.save(souscategorie);
    }

    @GetMapping("/getone/{id}")
    public Souscategorie getoneSouscategorie(@PathVariable Long id){
        return souscategorieRepository.findById(id).get();
    }

    @PutMapping("/maj/{id}")
    public Souscategorie majSouscategorie(@PathVariable Long id,@RequestBody Souscategorie sc){
        Souscategorie sc1=souscategorieRepository.findById(id).get();
        if(sc1!=null){
            sc.setId(id);
            sc.setCategorie(sc1.getCategorie());
            return souscategorieRepository.saveAndFlush(sc);
        }
        else{
            throw new RuntimeException("Echec !");
        }

    }

    @DeleteMapping("/supprimer/{id}")
    public HashMap<String,String> supprimerSouscategorie(@PathVariable Long id){
        HashMap<String,String> message=new HashMap<>();
        try {
            souscategorieRepository.deleteById(id);
            message.put("Etat : ","La sous-catégorie a été supprimé");
        }
        catch(Exception e){
            message.put("Etat : ","La sous-catégorie n'a pas été supprimé");
        }
        return message;
    }
}
