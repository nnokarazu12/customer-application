package com.sample.customerapplication.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String street;
    private String city;
    private String state;
    private String zipcode;

    @Override
    public String toString() {
        return "Address{" + "id=" + getId() + ", full_address='" + getStreet() + " " + getCity() +
                " " + getState() + " " + getZipcode() + '}';
    }
}
