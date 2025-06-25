package com.itgate.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "commandes")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;
    private String reference;
    private String prix;
    private String date;


    private String quantitetotale;


    @ManyToOne
    @JoinColumn(name = "id_client")
    private Client client;


  /*  @ManyToMany
    @JoinTable(name = "prod_com", joinColumns=@JoinColumn(name="id_com"),
            inverseJoinColumns = @JoinColumn(name = "id_prod"))

    private Collection<Produit> produits;*/


    @OneToMany(mappedBy = "commande", cascade = CascadeType.REMOVE)
    private Collection<CommandeProduit> commandeProduits ;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getPrix() {
        return prix;
    }

    public void setPrix(String prix) {
        this.prix = prix;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    public String getQuantitetotale() {
        return quantitetotale;
    }

    public void setQuantitetotale(String quantitetotale) {
        this.quantitetotale = quantitetotale;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

 /*   public Collection<Produit> getProduits() {
        return produits;
    }

    public void setProduits(Collection<Produit> produits) {
        this.produits = produits;
    }
    public void ajouterproduit(Produit p){
        if(produits==null){
            produits = new ArrayList<>();
        }
        produits.add(p);
    }*/
@JsonIgnore
    public Collection<CommandeProduit> getCommandeProduits() {
        return commandeProduits;
    }

    public void setCommandeProduits(Collection<CommandeProduit> commandeProduits) {
        this.commandeProduits = commandeProduits;
    }
}
