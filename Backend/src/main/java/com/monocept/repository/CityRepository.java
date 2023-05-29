package com.monocept.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.entity.City;

public interface CityRepository extends JpaRepository<City, Integer>{

}
