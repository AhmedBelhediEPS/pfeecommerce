package com.itgate.ecommerce.models;

import jakarta.persistence.*;

@Entity
public class CommandeProduit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    private String qteclient;

    @ManyToOne
    @JoinColumn(name = "id_com")
    private Commande commande;

    @ManyToOne
    @JoinColumn(name = "id_prod")
    private Produit produit;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getQteclient() {
        return qteclient;
    }

    public void setQteclient(String qteclient) {
        this.qteclient = qteclient;
    }

    public Commande getCommande() {
        return commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }
}
