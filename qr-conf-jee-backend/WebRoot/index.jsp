<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<base href="<%=basePath%>">
<title>QR Conference Home</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link href="css/jquery-ui-1.10.4.custom.css" rel="stylesheet">
<link href="css/genuitec-styles.css" rel="stylesheet">
<script src="js/jquery-1.10.2.js"></script>
<script src="js/jquery-ui-1.10.4.custom.js"></script>
</head>

<body>
	<h1>Welcome to the QR Conference Center</h1>
	<h2>Log in to manage your conferences and contacts</h2>
	<p>If you have permissions, you may access the QR Conference center to track conference<br/>
	attendees, export contacts, and manage your conference list.<br/>&nbsp;</p>
	<p><a class="button" href="admin/">Enter the Center</a></p>
</body>
</html>