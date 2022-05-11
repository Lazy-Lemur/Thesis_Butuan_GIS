<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.nio.file.Paths" %>

       <%
	   
String driver = "org.postgresql.Driver";
String url = "jdbc:postgresql://127.0.0.1:5432/butuan_gis";
String username = "postgres";
String password = "admin";
Connection myConnection = null;
PreparedStatement pst = null;
ResultSet myRs = null;
Class.forName(driver).newInstance();
Statement st;
//ResultSet rs;
int rows = 0;
int batchSize = 20;
//String filename = request.getParameter("filepath");
//String filePath = "C:\\Program Files (x86)\\Apache Software Foundation\\Tomcat 9.0\\webapps\\thesis_butuan_gis\\uploads\\dataset_2010_with_id.csv"
String filePath = "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\thesis_butuan_gis\\static\\dbase\\dataset_2010_with_id.csv";
//String filePath = "C:\\Users\\LENOVO-PC\\OneDrive\\Desktop\\Thesis Folder\\datasets\\for demo\\dataset_2010_with_id.csv";
//Path filePath = Paths.get("C:\\Users\\LENOVO-PC\\OneDrive\\Desktop\\Thesis Folder\\datasets\\for demo\\", filePath);
    
    myConnection = DriverManager.getConnection(url,username,password);
    myConnection.setAutoCommit(false);
    
    BufferedReader lineReader = new BufferedReader(new FileReader(filePath));
    String lineText = null;
    int count = 0;
    lineReader.readLine();
    while((lineText=lineReader.readLine())!=null){
        String[] data = lineText.split(",");
        
        String brgy = data[0];
        int population = Integer.parseInt(data[1]);
        int employed = Integer.parseInt(data[2]);
        int unemployed = Integer.parseInt(data[3]);
        int underemployed = Integer.parseInt(data[4]);
        int year = Integer.parseInt(data[5]);
        
//       pst = myConnection.prepareStatement("INSERT INTO bxu_data (id, brgy, population, employed, unemployed, underemployed, hectares, sqkm, year, class, geom) "
//        + "VALUES ((SELECT MAX(id)+1 FROM bxu_data), ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT geom FROM bxu_data WHERE brgy = '"+brgy+"' AND year = 2015));");
        
        pst = myConnection.prepareStatement("INSERT INTO dynamic_table (id, brgy, population, employed, unemployed, underemployed, year) "
        + "VALUES ((SELECT COUNT(id)+1 FROM dynamic_table), ?, ?, ?, ?, ?, ? );");
        
        pst.setString(1, brgy);
        pst.setInt(2, population);
        pst.setInt(3, employed);
        pst.setInt(4, unemployed);
        pst.setInt(5, underemployed);
        pst.setInt(6, year);
//        pst.addBatch();
        rows = pst.executeUpdate();
        pst.close();
//        count++;
//        if(count % batchSize == 0){
//            pst.executeBatch();
//        }
    }
    

    lineReader.close();
//    pst.executeBatch();
    myConnection.commit();
    myConnection.close();
    
//    rows = pst.executeUpdate();

String success = "";
if(rows > 0){
    success = "True";
}else{
    success = "False";
}
       %>
[{"success": "<%= success %>"}]