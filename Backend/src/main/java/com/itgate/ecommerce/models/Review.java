package com.itgate.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)

    private long id;

    private int ratingStar;

    private String ratingBox;

//    @JsonFormat(pattern="yyyy-MM-dd")


    private String reviewDate;
    @Column(name="STATUS")
    private Integer status;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getRatingStar() {
        return ratingStar;
    }

    public void setRatingStar(int ratingStar) {
        this.ratingStar = ratingStar;
    }

    public String getRatingBox() {
        return ratingBox;
    }

    public void setRatingBox(String ratingBox) {
        this.ratingBox = ratingBox;
    }


    public String getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(String reviewDate) {
        this.reviewDate = reviewDate;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    @ManyToOne
    @JoinColumn(name="id_client")
    private Client client;

    @ManyToOne
    @JoinColumn(name="id_product")
    private Produit produit;


}
