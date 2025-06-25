package com.itgate.ecommerce.models;

public class responseMessage {

    private String message;

    public responseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
