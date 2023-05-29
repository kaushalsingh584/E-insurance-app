package com.monocept.exception;

public class EntityNotFoundException extends RuntimeException { 

    private static final long serialVersionUID = 1L;

	public EntityNotFoundException(Long id, Class<?> entity) {
            super("The " + entity.getSimpleName().toLowerCase() + " with id '" + id + "' does not exist in our records");
    }

	public EntityNotFoundException(String message) {
		super(message);
	}

}