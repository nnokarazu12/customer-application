package com.sample.customerapplication.mappers;

import com.sample.customerapplication.dtos.AddressDto;
import com.sample.customerapplication.dtos.CustomerDto;
import com.sample.customerapplication.entities.Address;
import com.sample.customerapplication.entities.Customer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerDto toCustomerDto(Customer customer);
    Customer toCustomer(CustomerDto customerDto);
    AddressDto toAddressDto(Address address);
}
