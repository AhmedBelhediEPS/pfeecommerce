package com.itgate.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Collection;

@Entity
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy ="categorie",cascade = CascadeType.REMOVE)
    private Collection<Souscategorie> souscategories;



    private String titre;
    private String description;

    public long getId() {
        return id;
    }

    public void setId(long id) {
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
    public Collection<Souscategorie> getSouscategories() {
        return souscategories;
    }

    public void setSouscategories(Collection<Souscategorie> souscategories) {
        this.souscategories = souscategories;
    }
}
