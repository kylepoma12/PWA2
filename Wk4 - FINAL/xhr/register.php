<?php
// Error reporting:
error_reporting(E_ALL^E_NOTICE);

//database config information
include_once('config.php');

$errors = array();

// Checking the input data and adding potential errors to the $errors array:
if(!$_POST['username'] || $_POST['username'] == 'username')
{
	$errors['username']='Please provide a valid username.';
}

//does the email input look like a real email address:
if(!$_POST['email'] || !preg_match("/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/", $_POST['email']))
{
	$errors['email']='Please fill in a valid email!';
}else{

//does this email already exist in the database, kick back an error if so:
	$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $db);
	$stmt = $mysqli->prepare("SELECT email from users where email = ? LIMIT 1");
	$email = $_POST['email'];
	$stmt->bind_param("s", $email);
	$stmt->execute();
	$stmt->store_result();
	$result = $stmt->num_rows;
	$stmt->close();

	if($result) {
		$errors['email']='This email has already been registered!';
	}
}

if(!$_POST['pass'] || strlen($_POST['pass'])<6)
{
	$errors['pass']='Please fill in a valid password!<br />Must be at least 6 characters long.';
}

if( (!$_POST['cpass']) || ($_POST['cpass'] != $_POST['pass']))
{
	$errors['cpass']='Please confirm your passwords match!';
}

// Checking whether the fromRequest variable was sent

if($_POST['fromRegister'])
{
	if(count($errors))
	{
		$errString = array();
		foreach($errors as $c=>$d)
		{
			// The name of the field causing the error, and the response
			// text are grouped as a key - value pair:
			$errString[]='"'.$c.'":"'.$d.'"';
		}

		// echo error response and die:
		die	('{"status":0,'.join(',',$errString).'}');
	}


	//form is valid, enter registration details into user table:

	$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $db);
	
	$stmt = $mysqli->prepare("INSERT INTO users (`email`, `password`, `username`) VALUES (?, MD5(?), ?)");
	$username = $_POST['username'];
	$user = $_POST['email'];
    $pass = $_POST['pass'];
	$stmt->bind_param("sss", $user, $pass, $username);
	$stmt->execute();
	$lastid = $mysqli->insert_id;
	$stmt->close();
	

	// AJAX success response. Returns the username for the log in form:
	echo '{"status":1,"username":"'.$username.'","pass":"'.$pass.'","userID":"'.$lastid.'"}';

	exit;
}



?>