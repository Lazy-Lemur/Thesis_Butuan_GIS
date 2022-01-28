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
//         String query  = "SELECT selected."+request.getParameter("parameter")+", selected.country_name, st_asgeojson(ST_Centroid(countries.geom)) FROM countries LEFT JOIN (SELECT SUM(daily_"+request.getParameter("parameter")+") as "+request.getParameter("parameter")+", country_name FROM world_covid_data where date >= '"+request.getParameter("date1")+"' AND date <= '"+request.getParameter("date2")+"' GROUP BY country_name) as selected ON (selected.country_name = countries.country_name)";
//           String query = "SELECT "+request.getParameter("parameter")+", brgy, st_asgeojson(ST_Centroid(geom)), sqkm FROM bxu_data WHERE year = "+request.getParameter("year")+" ";
           String query = "SELECT dyn."+request.getParameter("parameter")+" as "+request.getParameter("parameter")+", stat.brgy as brgy, st_asgeojson(ST_Centroid(geom)), stat.sqkm as sqkm FROM static_table as stat, dynamic_table as dyn WHERE dyn.year = "+request.getParameter("year")+" AND stat.brgy = dyn.brgy";
//           String query = "SELECT stat.brgy as brgy, st_asgeojson(ST_Centroid(geom)), stat.sqkm as sqkm FROM static_table as stat";

          rs = st.executeQuery(query) ;
		ResultSetMetaData  meta = rs.getMetaData();
Integer columncount = meta.getColumnCount();
       %>
{"type":"FeatureCollection",
    "features":[
     <% while(rs.next()){ %>
    {"type":"Feature",
     "geometry":<%= rs.getString("st_asgeojson")%>,
     "properties":{
     <% for (int i = 1 ; i<=columncount; i++)
        {
        if(!meta.getColumnName(i).equals("st_asgeojson"))
     {
    %>
        <% if (i>1){%>,<% } %>
     "<%= meta.getColumnName(i)%>":"<%= rs.getString(meta.getColumnName(i))%>"
 <% }} %>
 }}
 <% if (!rs.isLast()){%>,<% } %>
 <% } %>
]}
	 
     
 