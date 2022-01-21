<%@ page import="java.sql.*" %>


       <%
	   
String driver = "org.postgresql.Driver";
String url = "jdbc:postgresql://127.0.0.1:5432/butuan_gis";
String username = "postgres";
String password = "pgsql_admin13";
Connection myConnection = null;
PreparedStatement myPreparedStatement = null;
ResultSet myResultSet = null;
Class.forName(driver).newInstance();
myConnection = DriverManager.getConnection(url,username,password);
Statement st;
ResultSet rs;
st = myConnection.createStatement();
//            String query = "SELECT SUM("+request.getParameter("parameter")+") as "+request.getParameter("parameter")+", year FROM bxu_data WHERE year = "+request.getParameter("year")+" GROUP BY year ORDER BY year";	  
            String query1 = "SELECT SUM("+request.getParameter("parameter")+") as "+request.getParameter("parameter")+", class FROM bxu_data WHERE year = "+request.getParameter("year")+" GROUP BY class ORDER BY class";
                rs = st.executeQuery(query1);
		ResultSetMetaData  meta = rs.getMetaData();
Integer columncount = meta.getColumnCount();
       %>
[
      <% while(rs.next()){ %>
	 {
  <% for (int i = 1 ; i<=columncount; i++)
{
%>
 <% if (i>1){%>,<% } %>
"<%= meta.getColumnName(i)%>":"<%= rs.getString(meta.getColumnName(i))%>"
    <% } %>
}
	  <% if (!rs.isLast()){%>,<% } %>
	   <% } %>
]
