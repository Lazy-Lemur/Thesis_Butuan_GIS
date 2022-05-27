package gis.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.SQLException;

import gis.core.Account;
import gis.core.EncryptPassword;
import gis.dao.AccountsDAO;

/**
 * Servlet implementation class RegistrationServlet
 */
@WebServlet("/register")
public class RegistrationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private AccountsDAO accDAO;
	private EncryptPassword encrypt;
   
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		RequestDispatcher dispatcher = null;
		
		String first_name = request.getParameter("first_name").trim();
		String last_name = request.getParameter("last_name").trim();
		String email = request.getParameter("email").trim();
		String password = request.getParameter("password").trim();
		String confirm_password = request.getParameter("confirm_password").trim();
		
		try {
			accDAO = new AccountsDAO();
			
			Account account = new Account(first_name, last_name, email, password, confirm_password);
			int rowCount = accDAO.registerAccount(account);
			
			dispatcher = request.getRequestDispatcher("login_signup_form.jsp");
			
			if(rowCount > 0) {
				request.setAttribute("status_reg", "success");
			} else {
				request.setAttribute("status_reg", "failed");
			}
			
			dispatcher.forward(request, response);
		} catch(Exception exc) {
			exc.printStackTrace();
		}
	}

}
