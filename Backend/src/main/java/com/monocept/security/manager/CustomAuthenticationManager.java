package com.monocept.security.manager;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import com.monocept.entity.User;
import com.monocept.security.GrantedAuthorityImpl;
import com.monocept.service.IUserService;

@Component
public class CustomAuthenticationManager implements AuthenticationManager {

	
	@Autowired
	private IUserService service;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		User user = service.getUser(authentication.getName());
		if (!bCryptPasswordEncoder.matches(authentication.getCredentials().toString(), user.getPassword())) {
			throw new BadCredentialsException("You provided an incorrect password.");
		}
		String role = user.getRole(); // Get the user's role as a string
	    return new UsernamePasswordAuthenticationToken(authentication.getName(), user.getPassword(),
	            setUserAuthorities(role));
	}

	public Collection<GrantedAuthority> setUserAuthorities(String role) {
	    List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
	    grantedAuthorities.add(new SimpleGrantedAuthority(role)); // Create a GrantedAuthority from the role string
	    return grantedAuthorities;
	}

}
