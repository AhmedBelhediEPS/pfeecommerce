package com.itgate.ecommerce.controllers;

import com.itgate.ecommerce.models.Categorie;
import com.itgate.ecommerce.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/categorie")
public class CategorieController {

    @Autowired
private CategorieRepository categorieRepository;
    @GetMapping("/all")
    public List<Categorie> getallCategorie(){
        return categorieRepository.findAll();
    }

    @PostMapping("/ajouter")
    public Categorie ajouterCategorie(@RequestBody Categorie categorie){
        return categorieRepository.save(categorie);
    }

    @GetMapping("/getone/{id}")
    public Categorie getoneCategorie(@PathVariable Long id){
        return categorieRepository.findById(id).get();
    }

    @PutMapping("/maj/{id}")
    public Categorie majCategorie(@PathVariable Long id,@RequestBody Categorie c){
        Categorie c1=categorieRepository.findById(id).get();
        if(c1!=null){
            c.setId(id);
            return categorieRepository.saveAndFlush(c);
        }
        else{
            throw new RuntimeException("Echec !");
        }

    }

    @DeleteMapping("/supprimer/{id}")
    public HashMap<String,String> supprimerCategorie(@PathVariable Long id){
        HashMap<String,String> message=new HashMap<>();
        try {
            categorieRepository.deleteById(id);
            message.put("Etat : ","La catégorie a été supprimé");
        }
        catch(Exception e){
            message.put("Etat : ","La catégorie n'a pas été supprimé");
        }
        return message;
    }
}

