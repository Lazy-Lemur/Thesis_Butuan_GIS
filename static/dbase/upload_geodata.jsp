<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@ page import="java.sql.*" %>


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
String filePath = "C:\\Program Files (x86)\\Apache Software Foundation\\Tomcat 9.0\\webapps\\thesis_butuan_gis\\static\\dbase\\dataset_2010_with_id.csv";

    myConnection = DriverManager.getConnection(url,username,password);

//    String query1 = "INSERT INTO bxu_data (id, brgy, population, employed, unemployed, underemployed, hectares, sqkm, year, class, geom) "
//        + "VALUES ((SELECT MAX(id)+1 FROM bxu_data), '"+request.getParameter("brgy")+"', "+request.getParameter("population")+", "+request.getParameter("employed")+", "+request.getParameter("unemployed")+", "+request.getParameter("underemployed")+", "
//        + ""+request.getParameter("hectares")+", "+request.getParameter("sqkm")+", "+request.getParameter("year")+", '"+request.getParameter("class")+"', (SELECT geom FROM bxu_data WHERE brgy LIKE '%"+request.getParameter("brgy")+"%' AND year = 2015));";
//    int rows = st.executeUpdate(query1);
//      st = myConnection.createStatement();
    myConnection.setAutoCommit(false);
    
    BufferedReader lineReader = new BufferedReader(new FileReader(filePath));
    String lineText = null;
    int count = 0;
    lineReader.readLine();
    while((lineText=lineReader.readLine())!=null){
        String[] data = lineText.split(",");
        
        String id = data[0];
        String brgy = data[1];
        int population = Integer.parseInt(data[2]);
        int employed = Integer.parseInt(data[3]);
        int unemployed = Integer.parseInt(data[4]);
        int underemployed = Integer.parseInt(data[5]);
        double hectares = Double.parseDouble(data[6]);
        double sqkm = Double.parseDouble(data[7]);
        int year = Integer.parseInt(data[8]);
        String class_br = data[9];
        
       pst = myConnection.prepareStatement("INSERT INTO bxu_data (id, brgy, population, employed, unemployed, underemployed, hectares, sqkm, year, class, geom) "
        + "VALUES ((SELECT MAX(id)+1 FROM bxu_data), ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT geom FROM bxu_data WHERE brgy = '"+brgy+"' AND year = 2015));");
        
        pst.setString(1, brgy);
        pst.setInt(2, population);
        pst.setInt(3, employed);
        pst.setInt(4, unemployed);
        pst.setInt(5, underemployed);
        pst.setDouble(6, hectares);
        pst.setDouble(7, sqkm);
        pst.setInt(8, year);
        pst.setString(9, class_br);
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