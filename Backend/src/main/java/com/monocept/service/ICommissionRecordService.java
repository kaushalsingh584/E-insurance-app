package com.monocept.service;

import java.util.List;

import com.monocept.entity.CommissionRecord;

public interface ICommissionRecordService {

	CommissionRecord save(CommissionRecord commissionRecord);

	List<CommissionRecord> getAllCommissionRecord(int page, int size);

	CommissionRecord getCommissionRecordById(int id);

	CommissionRecord getCommissionRecordByUsername(String username);

	CommissionRecord update(CommissionRecord commissionRecord);

	String deletebyid(int id);

}
