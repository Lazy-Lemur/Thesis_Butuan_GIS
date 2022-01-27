<%@ page import="java.sql.*" %>


       <%
	   
String driver = "org.postgresql.Driver";
String url = "jdbc:postgresql://127.0.0.1:5432/butuan_gis";
String username = "postgres";
String password = "admin";
Connection myConnection = null;
PreparedStatement myPreparedStatement = null;
ResultSet myResultSet = null;
Class.forName(driver).newInstance();
myConnection = DriverManager.getConnection(url,username,password);
Statement st;
ResultSet rs;
st = myConnection.createStatement();
String query1 = "DELETE FROM bxu_data;";
int row = st.executeUpdate(query1);
String success = "";
if(row > 0){
       success = "True";
}
else{
       success = "False";
}
%>
[      
 {
"success":"<%= success %>"
 }
]
