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
//         String query  = "SELECT SUM(population) as population,  SUM(employed) as employed, SUM(unemployed) as unemployed, SUM(underemployed) as underemployed FROM bxu_data WHERE year = "+request.getParameter("year")+" AND brgy = '"+request.getParameter("brgy")+"'";
          String query  = "SELECT SUM(dyn.population) as population,  SUM(dyn.employed) as employed, SUM(dyn.unemployed) as unemployed, SUM(dyn.underemployed) as underemployed FROM static_table as stat, dynamic_table as dyn WHERE dyn.year = "+request.getParameter("year")+" AND stat.brgy = dyn.brgy AND stat.brgy = '"+request.getParameter("brgy")+"'";

          rs = st.executeQuery(query) ;
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