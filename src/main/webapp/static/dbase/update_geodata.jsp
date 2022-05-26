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
//ResultSet rs;
st = myConnection.createStatement();
//    String query1 = "UPDATE bxu_data SET brgy = '"+request.getParameter("brgy")+"', population = "+request.getParameter("population")+", employed = "+request.getParameter("employed")+", "
//        + "unemployed = "+request.getParameter("unemployed")+", underemployed = "+request.getParameter("underemployed")+", hectares = "+request.getParameter("hectares")+", "
//        + "sqkm = "+request.getParameter("sqkm")+", year = "+request.getParameter("year")+", class = '"+request.getParameter("class")+"' WHERE id = "+request.getParameter("id")+";";
String query1 = "UPDATE dynamic_table SET population = "+request.getParameter("population")+", employed = "+request.getParameter("employed")+", "
        + "unemployed = "+request.getParameter("unemployed")+", underemployed = "+request.getParameter("underemployed")+", "
        + "year = "+request.getParameter("year")+" WHERE id = "+request.getParameter("id")+";";
    int rows = st.executeUpdate(query1);
String success = "";
if(rows > 0){
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
