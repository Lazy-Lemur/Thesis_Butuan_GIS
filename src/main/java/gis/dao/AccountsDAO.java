package gis.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import gis.core.Account;
import gis.core.EncryptPassword;

public class AccountsDAO extends EncryptPassword{
	private Connection myConn;
	
	public AccountsDAO() throws SQLException {
		try {
			String driver = "org.postgresql.Driver";
			String url = "jdbc:postgresql://127.0.0.1:5432/butuan_gis";
			String username = "postgres";
			String password = "admin";
			
			Class.forName(driver).newInstance();
			myConn = DriverManager.getConnection(url, username, password);
			
		} catch(Exception exc){
			exc.printStackTrace();
		}
	}
	
	public int registerAccount(Account acc) throws SQLException {
		PreparedStatement pst = null;
		int rows = 0;
		try {
			pst = myConn.prepareStatement("INSERT INTO employees(first_name, last_name, email, password, confirm_password) "
					+ "VALUES(?, ?, ?, ?, ?)");
			
			pst.setString(1, acc.getFirstName());
			pst.setString(2, acc.getLastName());
			pst.setString(3, acc.getEmail());
			pst.setString(4, getHash(acc.getPassword().getBytes(), "MD5"));
			pst.setString(5, getHash(acc.getConfirm_password().getBytes(), "MD5"));
			
			rows = pst.executeUpdate();
		} catch(Exception exc) {
			exc.printStackTrace();
		} finally {
			close(pst, null, myConn);
		}
		
		return rows;
	}
	
	public boolean loginAccount(Account acc) throws SQLException {
		PreparedStatement pst = null;
		ResultSet rs = null;
		try {
			pst = myConn.prepareStatement("SELECT email, password FROM employees");
			
			rs = pst.executeQuery();
			
			while(rs.next()) {
				if(rs.getString("email").equals(acc.getEmail())) {
					if(rs.getString("password").equals(getHash(acc.getPassword().getBytes(), "MD5"))) {
						return true;
					}
				}
			}
			
			return false;
			
		} catch(Exception exc) {
			exc.printStackTrace();
		} finally {
			close(pst, rs, myConn);
		}
		
		return false;
	}
	
	public String getEmployeeNameByEmail(Account acc) throws SQLException {
		PreparedStatement pst = null;
		ResultSet rs = null;
		String employeeName = "";
		try {
			pst = myConn.prepareStatement("SELECT first_name, last_name, email, password FROM employees WHERE email = ? AND password = ? ");
			
			pst.setString(1,  acc.getEmail());
			pst.setString(2,  getHash(acc.getPassword().getBytes(), "MD5"));
			rs = pst.executeQuery();
			
			
			while(rs.next()) {
				if(rs.getString("email").equals(acc.getEmail())) {
					if(rs.getString("password").equals(getHash(acc.getPassword().getBytes(), "MD5"))) {
						employeeName = String.format("%s %s",rs.getString("first_name"), rs.getString("last_name"));

						return employeeName;
					}
				}
			}
			return employeeName;
		} catch(Exception exc) {
			exc.printStackTrace();
		} finally {
			close(pst, rs, null);
		}
		
		return employeeName;
	}
	
	public boolean checkIfEmailExists(String email) throws SQLException {
		PreparedStatement pst = null;
		ResultSet rs = null;
		try {
			pst = myConn.prepareStatement("SELECT email FROM employees");
			
			rs = pst.executeQuery();
			
			while(rs.next()) {
				if(rs.getString("email").equals(email)) {
					return true;
				}
			}
			
			return false;
		} catch(Exception exc) {
			exc.printStackTrace();
		} finally {
			close(pst, rs, myConn);
		}
		
		return false;
	}
	
	public void close(PreparedStatement pst, ResultSet rs, Connection con) throws SQLException {
		if(pst!=null) {
			pst.close();
		}
		if(rs!=null) {
			rs.close();
		}
		if(con!=null) {
			con.close();
		}
	}
}
