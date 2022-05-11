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
String userEmail = request.getParameter("email");
String userPass = request.getParameter("password");

st = myConnection.createStatement();
//         String query  = "SELECT MAX(SUM) From(SELECT SUM(daily_"+request.getParameter("parameter")+") as sum FROM world_covid_data where date >= '"+request.getParameter("date1")+"' AND date <= '"+request.getParameter("date2")+"' GROUP BY country_name) z";
String query = "SELECT email, password FROM employees";
rs = st.executeQuery(query);



while(rs.next()){
    if(rs.getString("email").equals(userEmail)){
        if(rs.getString("password").equals(userPass)){
            success = "True";
        }
        else{
            success = "Password is incorrect";
        }
    }
    else{
        success = "Employee email does not exist";
    }
}

if(userEmail == "" || userPass == ""){
    success = "Please input email and password";
}

       %>
[{"success": "<%= success %>"}]
	 
