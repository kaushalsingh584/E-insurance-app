package com.monocept.security.filter;

import java.io.IOException;
import java.security.Key;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

//import com.auth0.jwt.JWT;
//import com.auth0.jwt.algorithms.Algorithm;
//import com.auth0.jwt.interfaces.Claim;
//import com.auth0.jwt.interfaces.DecodedJWT;
import com.monocept.security.GrantedAuthorityImpl;
import com.monocept.security.SecurityConstants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SigningKeyResolverAdapter;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthorizationFilter extends OncePerRequestFilter {


	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, jakarta.servlet.FilterChain filterChain)
			throws jakarta.servlet.ServletException, IOException {

		String header = request.getHeader("Authorization");

		if (header == null || !header.startsWith(SecurityConstants.BEARER)) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = header.replace(SecurityConstants.BEARER, "");
		
		Key key = Keys.hmacShaKeyFor(SecurityConstants.SECRET_KEY.getBytes());
		
		JwtParser parser = Jwts.parserBuilder()
                .setSigningKeyResolver(new SigningKeyResolverAdapter() {
                    @Override
                    public Key resolveSigningKey(io.jsonwebtoken.JwsHeader header, Claims claims) {
                        return key;
                    }
                })
                .build();
		
		Jws<Claims> jws = parser.parseClaimsJws(token);

	    Collection<GrantedAuthority> authorities = new ArrayList<>();
	    String user = jws.getBody().getSubject();
	    String rolesString = jws.getBody().get("roles", String.class).replace("\"", "");
	    if (rolesString.length() > 0) {
	        List<String> roles = Stream.of(rolesString.split(",")).collect(Collectors.toList());
	        for (String r : roles) {
	            authorities.add(new SimpleGrantedAuthority(r));
	        }
	    }
	    
//	    String role = jws.getBody().get("role", String.class);
//	    authorities.add(new SimpleGrantedAuthority(role));

	    Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
	    SecurityContextHolder.getContext().setAuthentication(authentication);
	    filterChain.doFilter(request, response);
	}
}
