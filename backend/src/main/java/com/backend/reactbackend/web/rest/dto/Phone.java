package com.backend.reactbackend.web.rest.dto;

public class Phone {
    private Integer id;
    private String company;
    private String model;

    public Phone(Integer id, String company, String model) {
        this.id = id;
        this.company = company;
        this.model = model;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
