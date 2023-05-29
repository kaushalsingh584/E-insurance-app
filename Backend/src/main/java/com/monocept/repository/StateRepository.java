package com.monocept.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.entity.State;

public interface StateRepository extends JpaRepository<State, Integer> {

}
