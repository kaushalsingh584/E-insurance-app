package com.monocept.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserExceptionHandler {

	
	@ExceptionHandler
	public ResponseEntity<UserExceptionResponse> handleException(UserNotFoundException e){
		UserExceptionResponse response= new UserExceptionResponse();
		response.setStatusCode(HttpStatus.NOT_FOUND.value());
		response.setMessage(e.getMessage());
		response.setTimeStamp(System.currentTimeMillis());
		
		return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
		
	}
	
	@ExceptionHandler
	public ResponseEntity<UserExceptionResponse> handleException(FullPaymentMadeException e){
		UserExceptionResponse response= new UserExceptionResponse();
		response.setStatusCode(HttpStatus.BAD_REQUEST.value());
		response.setMessage(e.getMessage());
		response.setTimeStamp(System.currentTimeMillis());
		
		return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
		
	}
	
	@ExceptionHandler
	public ResponseEntity<UserExceptionResponse> handleException(Exception e){
		UserExceptionResponse response= new UserExceptionResponse();
		response.setStatusCode(HttpStatus.BAD_REQUEST.value());
		response.setMessage(e.getMessage());
		response.setTimeStamp(System.currentTimeMillis());
		
		return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
		
	}
}
