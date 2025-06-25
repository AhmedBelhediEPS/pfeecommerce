package com.itgate.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;

@Entity
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

private Long id;
private String nom;
private String description;
private String prix;

private String quantite;
private String qteclient;

private String AvgRating;




//    @ElementCollection
private ArrayList<String> images=new ArrayList<>();





    @OneToMany(mappedBy ="produit",cascade = CascadeType.REMOVE)
    private Collection<Review> review;







    @ManyToOne
    @JoinColumn(name="id_souscategorie")
    private Souscategorie souscategorie;

    @ManyToOne
    @JoinColumn(name="id_fournisseur")
    private Fournisseur fournisseur;

 /*   @ManyToMany(mappedBy = "produits",cascade = CascadeType.REMOVE)
    private Collection<Commande> commandes;*/

    @OneToMany(mappedBy = "produit", cascade = CascadeType.REMOVE)
    private Collection<CommandeProduit> commandeProduits ;



    @ManyToMany(mappedBy = "produits",cascade = CascadeType.REMOVE)
    private Collection<Wishlist> wishlist;




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrix() {
        return prix;
    }

    public void setPrix(String prix) {
        this.prix = prix;
    }

    public String getQuantite() {
        return quantite;
    }

    public void setQuantite(String quantite) {
        this.quantite = quantite;
    }

    public ArrayList<String> getImages() {
        return images;
    }

    public void setImages(ArrayList<String> images) {
        this.images = images;
    }

    public Souscategorie getSouscategorie() {
        return souscategorie;
    }

    public void setSouscategorie(Souscategorie souscategorie) {
        this.souscategorie = souscategorie;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }
/*@JsonIgnore
    public Collection<Commande> getCommandes() {
        return commandes;
    }

    public void setCommandes(Collection<Commande> commandes) {
        this.commandes = commandes;
    }*/

    public String getQteclient() {
        return qteclient;
    }

    public void setQteclient(String qteclient) {
        this.qteclient = qteclient;
    }







@JsonIgnore

    public Collection<Review> getReview() {
        return review;
    }

    public void setReview(Collection<Review> review) {
        this.review = review;
    }


    public String getAvgRating() {
        return AvgRating;
    }

    public void setAvgRating(String avgRating) {
        AvgRating = avgRating;
    }
@JsonIgnore
    public Collection<CommandeProduit> getCommandeProduits() {
        return commandeProduits;
    }

    public void setCommandeProduits(Collection<CommandeProduit> commandeProduits) {
        this.commandeProduits = commandeProduits;
    }

@JsonIgnore
    public Collection<Wishlist> getWishlist() {
        return wishlist;
    }

    public void setWishlist(Collection<Wishlist> wishlist) {
        this.wishlist = wishlist;
    }



}
