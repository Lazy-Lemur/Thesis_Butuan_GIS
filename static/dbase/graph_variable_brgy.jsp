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
//        String query = "SELECT "+request.getParameter("parameter")+", brgy, sqkm FROM bxu_data WHERE year = "+request.getParameter("year")+" ";
        String query = "SELECT dyn."+request.getParameter("parameter")+" as "+request.getParameter("parameter")+", stat.brgy as brgy, stat.sqkm as sqkm FROM static_table as stat, dynamic_table as dyn WHERE dyn.year = "+request.getParameter("year")+" AND stat.brgy = dyn.brgy ";

        rs = st.executeQuery(query);
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