package gis.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;

import gis.core.Account;
import gis.core.EncryptPassword;
import gis.dao.AccountsDAO;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private AccountsDAO accDAO;
 
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RequestDispatcher dispatcher = null;
		HttpSession session = request.getSession();
		
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		
		try {
			accDAO = new AccountsDAO();
			
			Account account = new Account("", "", email, password, "");
			String employeeName = accDAO.getEmployeeNameByEmail(account);
			
			boolean userExists = accDAO.loginAccount(account);
			
			if(userExists) {
				session.setAttribute("name", employeeName);
				dispatcher = request.getRequestDispatcher("main_gis.html");
			} else {
				request.setAttribute("status_login", "failed");
				dispatcher = request.getRequestDispatcher("login_signup_form.jsp");
			}
			
			dispatcher.forward(request, response);
		} catch(Exception exc) {
			exc.printStackTrace();
		}
	}

}
