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
//            String query1 = "SELECT id, brgy, population, employed, unemployed, underemployed, hectares, sqkm, year, class, geom FROM bxu_data ORDER BY id";
            String query1 = "SELECT dyn.id as id, dyn.brgy as brgy, dyn.population as population, dyn.employed as employed, dyn.unemployed as unemployed, dyn.underemployed as underemployed, stat.hectares as hectares, stat.sqkm as sqkm, dyn.year as year, stat.class as class, stat.geom as gepm FROM static_table as stat, dynamic_table as dyn WHERE stat.brgy = dyn.brgy ORDER BY dyn.id";

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
