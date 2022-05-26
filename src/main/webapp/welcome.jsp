<%@ page import="gis.core.EncryptPassword" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>welcome</title>
  </head>
  <body>
  <%= EncryptPassword.getHash("qwerty12".getBytes(), "MD5") %>
    <% 
      String _fname = request.getParameter("FirstName"); 
      out.println(_fname);
    %>
  </body>
</html>
