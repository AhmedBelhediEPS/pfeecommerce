package com.itgate.ecommerce.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "wishlist")
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id;


    @OneToOne
    @JoinColumn(name = "id_client")
    private Client client;

    @Column(name = "created_date")
//    private Date createdDate;
    LocalDate createdDate = LocalDate.now();


    @ManyToMany
    @JoinTable(name = "wlist_prod", joinColumns=@JoinColumn(name="id_wishlist"),
            inverseJoinColumns = @JoinColumn(name = "id_prod"))

    private Collection<Produit> produits;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

//    public Date getCreatedDate() {
//        return createdDate;
//    }
//
//    public void setCreatedDate(Date createdDate) {
//        this.createdDate = createdDate;
//    }


    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public Collection<Produit> getProduits() {
        return produits;
    }

    public void setProduits(Collection<Produit> produits) {
        this.produits = produits;
    }




//    AddProductToWishlist
    public void ajouterproduit(Produit p){
        if(produits==null){
            produits = new ArrayList<>();
        }
        produits.add(p);
    }



    //    RemoveProductFromWishlist

    public void supprimerproduit(Produit p){
        if(produits != null){
            produits.remove(p);
        }
    }


    public boolean containProduit(Produit produit) {
        return this.produits.contains(produit);
    }


}
