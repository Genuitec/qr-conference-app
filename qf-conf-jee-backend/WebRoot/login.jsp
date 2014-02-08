<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <title>QR Conference Login</title>
    </head>
    <body>
        <h2>Log in to the QR Conference portal:</h2>
        <form name="loginForm" method="POST" action="j_security_check">
            <p><strong>Please type your user name: </strong>
                <input type="text" name="j_username" size="25"></p>
            <p><strong>Please type your password: </strong>
                <input type="password" size="15" name="j_password"></p>
            <p>
                <input type="submit" value="Submit"/>
                <input type="reset" value="Reset"/></p>
        </form>       
    </body>
</html>