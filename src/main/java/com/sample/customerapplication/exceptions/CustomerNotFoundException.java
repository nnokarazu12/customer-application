package com.sample.customerapplication.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException(long id) {
        super("Cannot find customer with id: " + id);
    }
}
