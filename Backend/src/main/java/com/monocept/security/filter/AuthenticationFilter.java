package com.monocept.security.filter;

import java.io.IOException;
import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

//import com.monocept.entity.Role;
import com.monocept.entity.User;
import com.monocept.security.SecurityConstants;
import com.monocept.security.manager.CustomAuthenticationManager;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
//import com.auth0.jwt.JWT;
//import com.auth0.jwt.JWTCreator.Builder;
//import com.auth0.jwt.algorithms.Algorithm;

import com.fasterxml.jackson.databind.ObjectMapper;

@Data
@AllArgsConstructor
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	@Autowired
	CustomAuthenticationManager authenticationManager;
//
//	public AuthenticationFilter(CustomAuthenticationManager authenticationManager) {
//		this.authenticationManager = authenticationManager;
//	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		try {
			User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
			Authentication authentication = new UsernamePasswordAuthenticationToken(user.getUsername(),
					user.getPassword());
			System.out.println(user.getUsername());
			System.out.println(user.getPassword());
			return authenticationManager.authenticate(authentication);

		} catch (IOException e) {
			throw new RuntimeException();
		}
	}


	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.getWriter().write(failed.getMessage());
		response.getWriter().flush();
	}

	@SuppressWarnings("deprecation")
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		System.out.println("Wohoo,Success....");
		
		System.out.println(authResult);
		
		List<String> rolesList = authResult.getAuthorities().parallelStream().map(x->x.getAuthority()).collect(Collectors.toList());
		String roleNames = String.join(",", rolesList);
		System.out.println(rolesList);
		
		System.out.println(roleNames);
//		
		Key keys = Keys.hmacShaKeyFor(SecurityConstants.SECRET_KEY.getBytes());
		
		String token = Jwts.builder().setSubject(authResult.getName())
				.claim("roles", roleNames)
				.setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.TOKEN_EXPIRATION))
				.signWith(keys,SignatureAlgorithm.HS512)
				.compact();
		    
		    response.addHeader(SecurityConstants.AUTHORIZATION, SecurityConstants.BEARER + token);
	}

}
