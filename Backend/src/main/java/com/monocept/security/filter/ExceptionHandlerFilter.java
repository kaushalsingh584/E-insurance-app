package com.monocept.security.filter;

import java.io.IOException;



import org.springframework.web.filter.OncePerRequestFilter;

import com.monocept.exception.EntityNotFoundException;

import jakarta.servlet.http.HttpServletResponse;

public class ExceptionHandlerFilter extends OncePerRequestFilter {


	@Override
	protected void doFilterInternal(jakarta.servlet.http.HttpServletRequest request,
			jakarta.servlet.http.HttpServletResponse response, jakarta.servlet.FilterChain filterChain)
			throws jakarta.servlet.ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			filterChain.doFilter(request, response);
		}
		catch(EntityNotFoundException e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			response.getWriter().write("Username not found"); 
			response.getWriter().flush();
		}
		catch (RuntimeException e) {
//			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			response.getWriter().write("BAD REQUEST"); 
			response.getWriter().flush();
		}
	}

}
