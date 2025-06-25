package com.itgate.ecommerce.controllers;

import com.itgate.ecommerce.models.*;
import com.itgate.ecommerce.repository.ClientRepository;
import com.itgate.ecommerce.repository.ProduitRepository;
import com.itgate.ecommerce.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    WishlistRepository wishlistRepository;

    @Autowired
    ClientRepository clientRepository;
    @Autowired
    ProduitRepository produitRepository;


    @GetMapping("/all")
    public List<Wishlist> getallWishlists(){
        return wishlistRepository.findAll();
    }

//    @PostMapping("/add")
//    public Wishlist addWishlist(@RequestBody Wishlist wishlist){
//        return wishlistRepository.save(wishlist);
//    }


//    @PostMapping("/add/{id_client}")
//    public Wishlist addWishlist(@RequestBody Wishlist wishlist,@RequestParam List<Long> ids,@PathVariable Long id_client){
//        for (int i=0; i<ids.size();i++){
//            Produit p = produitRepository.findById(ids.get(i)).get();
//            wishlist.ajouterproduit(p);
//        }
//
//        Client c = clientRepository.findById(id_client).get();
//        wishlist.setClient(c);
//        return wishlistRepository.save(wishlist);
//    }

    @PostMapping("/add/{id_client}")
    public ResponseEntity<?> addWishlist(@RequestBody Wishlist wishlist, @RequestParam List<Long> ids, @PathVariable Long id_client){
        Client client = clientRepository.findById(id_client).orElse(null);
        if (client == null) {
            return ResponseEntity.badRequest().body("Client not found.");
        }
        Wishlist existingWishlist = wishlistRepository.findByClient(client);
        if (existingWishlist != null) {
            return ResponseEntity.badRequest().body("Wishlist exists!");
        }
        wishlist.setClient(client);
        for (int i=0; i<ids.size();i++){
            Produit p = produitRepository.findById(ids.get(i)).get();
            wishlist.ajouterproduit(p);
        }
        Client c = clientRepository.findById(id_client).get();

        return ResponseEntity.ok(wishlistRepository.save(wishlist));
    }



//    @PutMapping("/update/{id_client}")
//    public ResponseEntity<?> updateWishlist(@RequestBody Wishlist wishlist, @RequestParam(required = false) List<Long> addIds, @RequestParam(required = false) List<Long> removeIds, @PathVariable Long id_client) {
//        Client client = clientRepository.findById(id_client).orElse(null);
//        if (client == null) {
//            return ResponseEntity.badRequest().body("Client not found.");
//        }
//        Wishlist existingWishlist = wishlistRepository.findByClient(client);
//
//
//        if (existingWishlist == null) {
//            return ResponseEntity.badRequest().body("Wishlist not found.");
//        }
//
//        if (addIds != null && !addIds.isEmpty()) {
//            for (Long addId : addIds) {
//                Produit p = produitRepository.findById(addId).orElse(null);
//
//                if (p != null ) {
//                    existingWishlist.ajouterproduit(p);
//                }
//            }
//        }
//
//        if (removeIds != null && !removeIds.isEmpty()) {
//            for (Long removeId : removeIds) {
//                Produit p = produitRepository.findById(removeId).orElse(null);
//                if (p != null) {
//                    existingWishlist.supprimerproduit(p);
//                }
//            }
//        }
//        return ResponseEntity.ok(wishlistRepository.save(existingWishlist));
//    }





//    @PutMapping("/update/{id_client}")
//    public ResponseEntity<?> updateWishlist(@RequestBody Wishlist wishlist, @RequestParam(required = false) List<Long> addIds, @RequestParam(required = false) List<Long> removeIds, @PathVariable Long id_client) {
//        Client client = clientRepository.findById(id_client).orElse(null);
//        if (client == null) {
//            return ResponseEntity.badRequest().body("Client not found.");
//        }
//        Wishlist existingWishlist = wishlistRepository.findByClient(client);
//
//
//        if (existingWishlist == null) {
//            return ResponseEntity.badRequest().body("Wishlist not found.");
//        }
//
//        if (addIds != null && !addIds.isEmpty()) {
//            for (Long addId : addIds) {
//                Produit p = produitRepository.findById(addId).orElse(null);
//
//                if (p != null ) {
//                    if (!existingWishlist.containProduit(p)) {
//                        existingWishlist.ajouterproduit(p);
//                    }
//                }
//            }
//        }
//
//        if (removeIds != null && !removeIds.isEmpty()) {
//            for (Long removeId : removeIds) {
//                Produit p = produitRepository.findById(removeId).orElse(null);
//                if (p != null) {
//                    existingWishlist.supprimerproduit(p);
//                }
//            }
//        }
//        return ResponseEntity.ok(wishlistRepository.save(existingWishlist));
//    }



    @GetMapping("/getone/{id}")
    public Wishlist getoneWishlist(@PathVariable Long id){
        return wishlistRepository.findById(id).get();
    }



    @PutMapping("/update/{id_client}")
    public ResponseEntity<?> updateWishlist(@RequestBody Wishlist wishlist, @RequestParam(required = false) List<Long> addIds, @RequestParam(required = false) List<Long> removeIds, @PathVariable Long id_client) {
        Client client = clientRepository.findById(id_client).orElse(null);
        if (client == null) {
            return ResponseEntity.badRequest().body("Client not found.");
        }
        Wishlist existingWishlist = wishlistRepository.findByClient(client);

        if (existingWishlist == null) {
            return ResponseEntity.badRequest().body("Wishlist not found.");
        }

        if (addIds != null && !addIds.isEmpty()) {
            for (Long addId : addIds) {
                Produit p = produitRepository.findById(addId).orElse(null);

                if (p != null ) {

                    if(existingWishlist.containProduit(p)){
                        return ResponseEntity.badRequest().body("l'un ou l'ensemble des produits que vous souhaitez ajouter existe(nt) déjà");
                    }

                    else {
                        existingWishlist.ajouterproduit(p);
                    }
                }
            }
        }

        if (removeIds != null && !removeIds.isEmpty()) {
            for (Long removeId : removeIds) {
                Produit p = produitRepository.findById(removeId).orElse(null);
                if (p != null) {
                    if(!existingWishlist.containProduit(p)){
                        return ResponseEntity.badRequest().body("l'un ou l'ensemble des produits que vous souhaitez supprimer n'existe(nt) pas");
                    }
                    else {
                        existingWishlist.supprimerproduit(p);
                    }
                }
            }
        }
        return ResponseEntity.ok(wishlistRepository.save(existingWishlist));
    }

    @DeleteMapping("/delete/{id}")
    public HashMap<String,String> deleteWishlist(@PathVariable Long id){
        HashMap<String,String> message=new HashMap<>();
        try {
            wishlistRepository.deleteById(id);
            message.put("Etat : ","La wishlist a été supprimée");
        }
        catch(Exception e){
            message.put("Etat : ","La wishlist n'a pas été supprimée");
        }
        return message;
    }




}
