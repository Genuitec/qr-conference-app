<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<base href="<%=basePath%>">
<title>QR Conference Login</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link rel="stylesheet" type="text/css" href="normalize.css">
<link rel="stylesheet" type="text/css" href="styles.css">
</head>

<body>
	<h2>Invalid user name or password.</h2>

	<p>Please enter a user name or password that is authorized to
		access this application.</p>
	<a href="./">Return to login page</a>
</body>
</html>
