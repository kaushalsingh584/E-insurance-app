package com.monocept.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.entity.SchemeDetail;

public interface DetailsRepisotory extends JpaRepository<SchemeDetail, Integer> {

}
