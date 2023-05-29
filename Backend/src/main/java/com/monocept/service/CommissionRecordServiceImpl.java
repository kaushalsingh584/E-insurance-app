package com.monocept.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.monocept.entity.CommissionRecord;
import com.monocept.entity.User;
import com.monocept.exception.EntityNotFoundException;
import com.monocept.exception.UserNotFoundException;
import com.monocept.repository.CommissionRecordRepo;
import com.monocept.repository.UserRepository;

@Service
public class CommissionRecordServiceImpl implements ICommissionRecordService{
	
	@Autowired
	private CommissionRecordRepo commissionRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public CommissionRecord save(CommissionRecord commissionRecord) {
		// TODO Auto-generated method stub
		return commissionRepo.save(commissionRecord);
	}

	@Override
	public List<CommissionRecord> getAllCommissionRecord(int page, int size) {
		// TODO Auto-generated method stub
		return commissionRepo.findAll();
	}

	@Override
	public CommissionRecord getCommissionRecordById(int id) {
		// TODO Auto-generated method stub
		 Optional<CommissionRecord> record = commissionRepo.findById(id);
		 if(!record.isPresent())
			 throw new EntityNotFoundException("Commission Record with id: "+ id + " is not found");
		return record.get();
			 
	}

	@Override
	public CommissionRecord getCommissionRecordByUsername(String username) {
		// TODO Auto-generated method stub
		Optional<User> agent = userRepo.findByUsername(username);
		if(agent.isPresent())
			throw new UserNotFoundException("Commission Record with username: "+ username + " is not found");
		agent.get();
		// incomplete h getCommissionRecordByUsername hi krna h 
		return null;
	}

	@Override
	public CommissionRecord update(CommissionRecord commissionRecord) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deletebyid(int id) {
		// TODO Auto-generated method stub
		Optional<CommissionRecord> record = commissionRepo.findById(id);
		if(!record.isPresent())
			throw new EntityNotFoundException("Record with id: "+ id + " not found !!");
		 commissionRepo.deleteById(id);
		 return "Record deleted";
	}

	
	
}
