package com.sample.customerapplication.services.impl;

import com.sample.customerapplication.dtos.AddressDto;
import com.sample.customerapplication.dtos.CustomerDto;
import com.sample.customerapplication.entities.Address;
import com.sample.customerapplication.entities.Customer;
import com.sample.customerapplication.mappers.CustomerMapper;
import com.sample.customerapplication.repositories.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomerServiceImplTest {
    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CustomerMapper customerMapper;

    @InjectMocks
    private CustomerServiceImpl customerService;

    private Customer customer;
    private CustomerDto customerDto;
    private Address address;
    private AddressDto addressDto;
    private List<Address> addresses;
    private List<AddressDto> addressDtos;

    @BeforeEach
    void setUp() {
        address = Address.builder()
                .id(1L)
                .street("123 Main St")
                .city("Springfield")
                .state("IL")
                .zipcode("62701")
                .build();

        addresses = new ArrayList<>();
        addresses.add(address);

        addressDto = new AddressDto(
                1L,
                "123 Main St",
                "Springfield",
                "IL",
                "62701"
        );

        addressDtos = new ArrayList<>();
        addressDtos.add(addressDto);

        customer = Customer.builder()
                .id(1L)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .phoneNumber("555-1234")
                .addresses(addresses)
                .dateCreated(LocalDateTime.now())
                .build();

        customerDto = new CustomerDto(
                1L,
                "John",
                "Doe",
                "john.doe@example.com",
                "555-1234",
                addressDtos,
                LocalDateTime.now()
        );
    }

    @Test
    void getAllCustomers_ShouldReturnListOfCustomerDtos() {
        // Arrange
        List<Customer> customers = Arrays.asList(customer);
        when(customerRepository.findAll()).thenReturn(customers);
        when(customerMapper.toCustomerDto(any(Customer.class))).thenReturn(customerDto);

        // Act
        List<CustomerDto> result = customerService.getAllCustomers();

        // Assert
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        assertThat(result.get(0)).isEqualTo(customerDto);
        verify(customerRepository, times(1)).findAll();
        verify(customerMapper, times(1)).toCustomerDto(customer);
    }

    @Test
    void getCustomerById_ShouldReturnCustomerDto_WhenCustomerExists() {
        // Arrange
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(customerMapper.toCustomerDto(customer)).thenReturn(customerDto);

        // Act
        CustomerDto result = customerService.getCustomerById(1L);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(customerDto);
        assertThat(result.firstName()).isEqualTo("John");
        assertThat(result.lastName()).isEqualTo("Doe");
        assertThat(result.email()).isEqualTo("john.doe@example.com");
        assertThat(result.phoneNumber()).isEqualTo("555-1234");
        verify(customerRepository, times(1)).findById(1L);
        verify(customerMapper, times(1)).toCustomerDto(customer);
    }
}