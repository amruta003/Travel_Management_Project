package com.odyssey.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "travel_packages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TravelPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long packageId;

    private String title;
    private String description;
    private String destination;
    private double price;


    private Integer duration;

    @NotNull
    @Positive
    private int totalTravellers;
    
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne()
    @JoinColumn(name = "agent_id", nullable = false)
    private User agent;

}
