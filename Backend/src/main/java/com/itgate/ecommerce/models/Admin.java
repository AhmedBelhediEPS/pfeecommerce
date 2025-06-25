package com.itgate.ecommerce.models;

import jakarta.persistence.Entity;

@Entity
public class Admin extends User{



    private String image;

    public Admin(String username, String email, String password, String image) {
        super(username, email, password);
        this.image = image;
    }

    public Admin(){}

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
