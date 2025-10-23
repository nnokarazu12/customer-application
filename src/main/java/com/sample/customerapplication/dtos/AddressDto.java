package com.sample.customerapplication.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddressDto (
    Long id,
    @NotBlank String street,
    @NotBlank String city,
    @NotBlank String state,
    @NotNull String zipcode
) {}
