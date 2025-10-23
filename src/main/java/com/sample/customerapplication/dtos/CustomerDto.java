package com.sample.customerapplication.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public record CustomerDto (
    Long id,
    @NotBlank String firstName,
    @NotBlank String lastName,
    @Email(message = "Please provide a valid email address.") String email,
    String phoneNumber,
    @NotNull List<AddressDto> addresses,
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime dateCreated
) {}
