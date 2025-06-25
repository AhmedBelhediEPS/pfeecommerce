package com.itgate.ecommerce.controllers;

import com.itgate.ecommerce.models.Client;
import com.itgate.ecommerce.models.Produit;
import com.itgate.ecommerce.models.Review;
import com.itgate.ecommerce.repository.ClientRepository;
import com.itgate.ecommerce.repository.ProduitRepository;
import com.itgate.ecommerce.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/review")
public class ReviewController {



    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ReviewRepository reviewRepository;


    @Autowired
    private ProduitRepository produitRepository;






    @GetMapping("/all")
    public List<Review> getallReview(){
        return reviewRepository.findAll();
    }





    @PostMapping("/add")
    public Review addReview(@RequestBody Review review){
        return reviewRepository.save(review);
    }


    @GetMapping("/getone/{id}")
     public Review getoneReview(@PathVariable Long id){
        return reviewRepository.findById(id).get();
    }

    @PutMapping("/update/{id}")
    public Review updateReview(@PathVariable Long id,@RequestBody Review r){
        Review r1=reviewRepository.findById(id).get();
        if(r1!=null){
            r.setId(id);
            return reviewRepository.saveAndFlush(r);
        }
        else{
            throw new RuntimeException("Echec !");
        }

    }

    @DeleteMapping("/delete/{id}")
    public HashMap<String,String> deleteReview(@PathVariable Long id){
        HashMap<String,String> message=new HashMap<>();
        try {
            reviewRepository.deleteById(id);
            message.put("Etat : ","La review a été supprimée !");
        }
        catch(Exception e){
            message.put("Etat : ","La review n'a pas été supprimée !");
        }
        return message;
    }






    @PostMapping("/save/{id_client}/{id_product}")
    public ResponseEntity<?> saveReview(@RequestBody Review r, @PathVariable Long id_client, @PathVariable Long id_product) {
        Client client = clientRepository.findById(id_client).orElse(null);
        if (client == null) {
            return ResponseEntity.badRequest().body("Client not found.");
        }

        Produit produit = produitRepository.findById(id_product).orElse(null);
        if (produit == null) {
            return ResponseEntity.badRequest().body("Produit not found.");
        }

        Review existingReview = reviewRepository.findByClientAndProduit(client, produit);
        if (existingReview != null) {
            return ResponseEntity.badRequest().body("Review already submitted.");
        }

        r.setClient(client);
        r.setProduit(produit);
        //r.setReviewDate(new Date());

        return ResponseEntity.ok(reviewRepository.save(r));
    }



}
