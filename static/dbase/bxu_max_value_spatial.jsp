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
//         String query  = "SELECT MAX(SUM) From(SELECT SUM(daily_"+request.getParameter("parameter")+") as sum FROM world_covid_data where date >= '"+request.getParameter("date1")+"' AND date <= '"+request.getParameter("date2")+"' GROUP BY country_name) z";
//String query = "SELECT MAX(SUM) FROM(SELECT SUM("+request.getParameter("parameter")+") as sum FROM bxu_data WHERE year = "+request.getParameter("year")+" GROUP BY brgy) as foo";
String query = "SELECT MAX(SUM) FROM(SELECT SUM(dyn."+request.getParameter("parameter")+") as sum FROM static_table as stat, dynamic_table as dyn WHERE dyn.year = "+request.getParameter("year")+" AND stat.brgy = dyn.brgy GROUP BY stat.brgy) as foo";

rs = st.executeQuery(query);
ResultSetMetaData  meta = rs.getMetaData();
Integer columncount = meta.getColumnCount();
       %>
{"maximum":[
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
]}
	 
