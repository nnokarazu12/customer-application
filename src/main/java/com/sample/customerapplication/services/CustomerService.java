package com.sample.customerapplication.services;

import com.sample.customerapplication.dtos.CustomerDto;
import com.sample.customerapplication.entities.Customer;

import java.util.List;

public interface CustomerService {
    List<CustomerDto> getAllCustomers();
    CustomerDto getCustomerById(Long id);
    CustomerDto addCustomer(CustomerDto customerDto);
    CustomerDto updateCustomer(Long id, CustomerDto customerDto);
    void deleteCustomer(Long id);
}
