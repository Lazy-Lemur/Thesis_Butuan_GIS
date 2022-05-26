<%@ page import="java.sql.*" %>

       <%
	   
String driver = "org.postgresql.Driver";
String url = "jdbc:postgresql://127.0.0.1:5432/butuan_gis";
String username = "postgres";
String password = "admin";
Connection myConnection = null;
Class.forName(driver).newInstance();
myConnection = DriverManager.getConnection(url,username,password);
Statement st;
ResultSet rs;
String success = "";
String first_name = request.getParameter("first_name");
String last_name = request.getParameter("last_name");
String email = request.getParameter("email");
String pass = request.getParameter("password");
String confirm_pass = request.getParameter("confirm_password");

st = myConnection.createStatement();
String query = "INSERT INTO employees(first_name, last_name, email, password, confirm_password) "
        + "VALUES('"+first_name+"', '"+last_name+"', '"+email+"', '"+pass+"', '"+confirm_pass+"');";

int rows = st.executeUpdate(query);

if(rows > 0){
    success = "True";
}
else{
    success = "False";
}

if(first_name == "" || last_name == "" || email == "" || 
        pass == "" || confirm_pass == ""){
    success = "Please fill up signup form to register";
}

       %>
[{"success": "<%= success %>"}]
	 
