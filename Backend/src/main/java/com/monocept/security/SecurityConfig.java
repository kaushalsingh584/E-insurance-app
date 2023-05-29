package com.monocept.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.monocept.security.filter.AuthenticationFilter;
import com.monocept.security.filter.ExceptionHandlerFilter;
import com.monocept.security.filter.JWTAuthorizationFilter;
import com.monocept.security.manager.CustomAuthenticationManager;

//import lombok.AllArgsConstructor;

import org.springframework.security.config.http.SessionCreationPolicy;


@Configuration
public class SecurityConfig {

	@Autowired
	CustomAuthenticationManager authenticationManager;
	
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationFilter authenticateFilter=new AuthenticationFilter(authenticationManager);
        authenticateFilter.setFilterProcessesUrl("/login");
    	
    	http        
            .csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers(HttpMethod.POST,SecurityConstants.REGISTER_USER_PATH).permitAll()
            .requestMatchers(HttpMethod.POST,"/employee/save").permitAll()
            .requestMatchers(HttpMethod.GET,"/insurance/getall").hasRole("admin")
            .requestMatchers("/agent/**").hasAnyAuthority("admin","employee","agent")
            .requestMatchers("/employee/**").hasAnyAuthority("admin","employee")
            .requestMatchers(HttpMethod.DELETE,"/commission/**").hasAnyAuthority("admin","employee")
            .requestMatchers(HttpMethod.DELETE,"/scheme/**").hasAnyAuthority("admin","employee")
            .requestMatchers(HttpMethod.POST,"/insuranceplan/**").hasAnyAuthority("admin")
            .requestMatchers(HttpMethod.POST,"/purchasedinsurance/buyInsurance/**").hasAnyAuthority("customer","admin")
            .requestMatchers(HttpMethod.POST,"/customer/**").hasAnyAuthority("admin","employee")
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(new ExceptionHandlerFilter(), AuthenticationFilter.class)
            .addFilter(authenticateFilter)
            .addFilterAfter(new JWTAuthorizationFilter(), AuthenticationFilter.class)
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }
    
}