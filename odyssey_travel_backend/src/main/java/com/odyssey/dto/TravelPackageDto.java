package com.odyssey.dto;

import com.odyssey.entity.Status;
import com.odyssey.entity.User;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TravelPackageDto {

	    @NotBlank
	    private String title;

	    @NotBlank
	    private String description;

	    @NotNull
	    @Positive
	    private Double price;

	    @NotNull
	    private Integer duration;

	    @NotBlank
	    private String destination;
	    
	    @NotNull
	    @Positive
	    private int totalTravellers;

	    @NotNull
	    private Long agentId;

	    
	}

