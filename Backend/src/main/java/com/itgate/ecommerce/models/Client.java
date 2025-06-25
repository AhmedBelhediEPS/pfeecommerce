package com.itgate.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Collection;

@Entity
public class Client extends User {
    @NotBlank(message = "Adresse is required")
private String adresse;
    @NotBlank(message = "Ville is required")
private String ville;
    @NotBlank(message = "Pays is required")
private String pays;
    @NotBlank(message = "Code postal is required")
private String codepostal;
    @NotNull(message = "Telephone is required")
private long telephone;
    @NotBlank(message = "Image is required")
private String image;


    public Client(String username, String email, String password, String adresse, String ville, String pays, String codepostal, long telephone, String image) {
        super(username, email, password);
        this.adresse = adresse;
        this.ville = ville;
        this.pays = pays;
        this.codepostal = codepostal;
        this.telephone = telephone;
        this.image = image;
    }

    public Client(){

    }




    @OneToMany(mappedBy ="client",cascade = CascadeType.REMOVE)
    private Collection<Review> review;


    @OneToOne(mappedBy = "client",cascade = CascadeType.REMOVE)
    private Wishlist wishlist;




    @OneToMany(mappedBy = "client",cascade = CascadeType.REMOVE)
    private Collection<Commande> commandes;
    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getCodepostal() {
        return codepostal;
    }

    public void setCodepostal(String codepostal) {
        this.codepostal = codepostal;
    }

    public long getTelephone() {
        return telephone;
    }

    public void setTelephone(long telephone) {
        this.telephone = telephone;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
@JsonIgnore
    public Collection<Commande> getCommandes() {
        return commandes;
    }

    public void setCommandes(Collection<Commande> commandes) {
        this.commandes = commandes;
    }






@JsonIgnore
    public Collection<Review> getReview() {
        return review;
    }

    public void setReview(Collection<Review> review) {
        this.review = review;
    }

@JsonIgnore
    public Wishlist getWishlist() {
        return wishlist;
    }

    public void setWishlist(Wishlist wishlist) {
        this.wishlist = wishlist;
    }



}
