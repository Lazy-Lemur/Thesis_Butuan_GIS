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
//            String query1 = "SELECT * FROM bxu_data WHERE id = " + request.getParameter("id")+ ";";
            String query1 = "SELECT id, brgy, population, employed, unemployed, underemployed, year FROM dynamic_table WHERE id = " + request.getParameter("id")+ ";";
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
