package com.itgate.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Collection;

@Entity
public class Souscategorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

private Long id;
private String titre;
private String description;


    @OneToMany(mappedBy = "souscategorie",cascade = CascadeType.REMOVE)
    private Collection<Produit> produits;

    @ManyToOne
    @JoinColumn(name="id_categorie")
    private Categorie categorie;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

@JsonIgnore
    public Collection<Produit> getProduits() {
        return produits;
    }

    public void setProduits(Collection<Produit> produits) {
        this.produits = produits;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }
}
