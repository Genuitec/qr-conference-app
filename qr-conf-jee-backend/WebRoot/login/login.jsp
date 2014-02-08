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
<link rel="stylesheet" type="text/css" href="styles.css">
</head>

<body>
	<h3>Login to the QR Conference Center:</h3>
	<form name="loginForm" method="POST" action="j_security_check">
		<p class="j_username">
			<input type="text" name="j_username" id="j_username" size="25"><label
				for="j_username">User Name</label>
		</p>
		<p class="j_password">
			<input type="password" size="15" name="j_password" id="j_password"><label
				for="j_password">Password</label>
		</p>
		<p class="submit">
			<input type="submit" value="Login" />
		</p>
	</form>
</body>
</html>