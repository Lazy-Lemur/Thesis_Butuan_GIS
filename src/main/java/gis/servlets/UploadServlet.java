package gis.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import gis.dao.AccountsDAO;

/**
 * Servlet implementation class UploadServlet
 */
@WebServlet(name="UploadServlet", urlPatterns= {"/uploadservlet"})
@MultipartConfig(
			fileSizeThreshold = 1024 * 1024, // 1MB
			maxFileSize = 1024 * 1024 * 50,  // 50MB
			maxRequestSize = 1024 * 1024 * 100 //100MB
		)
public class UploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private AccountsDAO accDAO;
   
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		try {
			Part filePart = request.getPart("file");
			String fileName = filePart.getSubmittedFileName();
			accDAO = new AccountsDAO();
			
			for (Part part : request.getParts()) {
				part.write("C:\\ButuanGIS File Uploads\\" + fileName);
			}
			accDAO.uploadCSV("C:\\ButuanGIS File Uploads\\" + fileName);
			response.getWriter().print("File uploaded successfully!");
		} catch(Exception exc) {
			exc.printStackTrace();
		}
		
	}

}
