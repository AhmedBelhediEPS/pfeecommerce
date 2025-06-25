package com.itgate.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Collection;

@Entity
public class Fournisseur extends User{

    private String matricule;
    private String service;
    private String societe;
    private String image;

    public Fournisseur(String username, String email, String password, String matricule, String service, String societe, String image) {
        super(username, email, password);
        this.matricule = matricule;
        this.service = service;
        this.societe = societe;
        this.image = image;
    }

    public Fournisseur(){}

    @OneToMany(mappedBy = "fournisseur",cascade = CascadeType.REMOVE)
    private Collection<Produit> produits;


    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getSociete() {
        return societe;
    }

    public void setSociete(String societe) {
        this.societe = societe;
    }
@JsonIgnore
    public Collection<Produit> getProduits() {
        return produits;
    }

    public void setProduits(Collection<Produit> produits) {
        this.produits = produits;
    }


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
