<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <title>Login Error</title>
    </head>
    <body>
	    <h2>Invalid user name or password.</h2>
	
	    <p>Please enter a user name or password that is authorized to access this application.</p>
	    <a href="./">Return to login page</a>
    </body>
</html>
