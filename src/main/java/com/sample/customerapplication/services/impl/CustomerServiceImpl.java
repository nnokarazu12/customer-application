package com.sample.customerapplication.services.impl;

import com.sample.customerapplication.dtos.CustomerDto;
import com.sample.customerapplication.entities.Address;
import com.sample.customerapplication.entities.Customer;
import com.sample.customerapplication.exceptions.CustomerNotFoundException;
import com.sample.customerapplication.mappers.CustomerMapper;
import com.sample.customerapplication.repositories.CustomerRepository;
import com.sample.customerapplication.services.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public CustomerServiceImpl(CustomerRepository customerRepository, CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }

    //Return a list of all customers
    @Override
    public List<CustomerDto> getAllCustomers() {
        List<CustomerDto> customerList = customerRepository.findAll().stream().map(customerMapper::toCustomerDto).toList();
        //logger.info("Customer list {}", customerList);
        return customerList;
    }

    //Return customer by id
    @Override
    public CustomerDto getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException(id));
        CustomerDto customerDto = customerMapper.toCustomerDto(customer);
        //logger.info("Customer {}", customerDto);
        return customerDto;
    }

    //Add a new customer
    @Override
    public CustomerDto addCustomer(CustomerDto customerDto) {
        Customer customer = customerMapper.toCustomer(customerDto);
        Customer savedCustomer = customerRepository.save(customer);
        //logger.info("Added a new customer {}", customerDto);
        return customerMapper.toCustomerDto(savedCustomer);
    }

    //Update customer information
    @Override
    public CustomerDto updateCustomer(Long id, CustomerDto customerDto) {
        Customer currentCustomer = customerRepository.findById(id).orElseThrow(() -> new CustomerNotFoundException(id));
        currentCustomer.setEmail(customerDto.email());
        currentCustomer.setPhoneNumber(customerDto.phoneNumber());

        // Update addresses in place
        List<Address> updatedAddresses = customerMapper.toCustomer(customerDto).getAddresses();

        // Clear existing list but keep the same list instance
        if (currentCustomer.getAddresses() == null) {
            currentCustomer.setAddresses(new ArrayList<>());
        } else {
            currentCustomer.getAddresses().clear();
        }

        // Add updated addresses
        for (Address addr : updatedAddresses) {
            currentCustomer.getAddresses().add(addr);
        }

        Customer updatedCustomer = customerRepository.save(currentCustomer);
        return customerMapper.toCustomerDto(updatedCustomer);
    }

    //Remove a customer
    @Override
    public void deleteCustomer(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        //Check if customer is not found
        if(customer.isPresent()) {
            logger.info("Customer with id {} deleted", id);
            customerRepository.deleteById(id);
        } else {
            throw new CustomerNotFoundException(id);
        }
    }
}
