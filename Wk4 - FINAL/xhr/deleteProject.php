<?php
// Error reporting:
error_reporting(E_ALL^E_NOTICE);


//get db stuff
include_once('config.php');


	$pid = $_POST['pid'];
	$uid = $_POST['uid'];

	$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $db);
	
	$stmt = $mysqli->prepare("DELETE From `projects` where pid = ?");
	
	$stmt->bind_param("i", $pid);
	$stmt->execute();
	$stmt->free_result();
	$stmt->close();	
	

			
				//get projects for user
				$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $db);
				$stmt = $mysqli->prepare('SELECT `pid`, `pname`, `pdesc`, `pdate`, `pstatus`, `uid` from `projects` where `uid` = ?');
				$stmt->bind_param("i", $uid);
				$stmt->execute();
				
				$rows = array();
				$stmt->store_result();
				//check number of rows from query
				$numrows = $stmt->num_rows;
				$stmt->bind_result( $row->pid, $row->pname, $row->pdesc, $row->pdate, $row->pstatus, $row->uid );
				while (mysqli_stmt_fetch($stmt)) {
					  $rows[] = $row;
					  $row = new stdClass();
					  mysqli_stmt_bind_result($stmt, $row->pid, $row->pname, $row->pdesc, $row->pdate, $row->pstatus, $row->uid);
				 }
			
				$stmt->free_result();
				$stmt->close();
				
				
				
				
				
				
			if(!$rows){
					echo "[:".$uid.":] You have no projects, to create a new project fill out the form to the right -->";
					exit;	
			}else{
			
			
			
			echo '<div id="accordion">';

			foreach ($rows as $objects) {
				
				//GET TASKS
				$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $db);
				$stmt2 = $mysqli->prepare('SELECT `tid` from `tasks` where `pid` = ?');
				$stmt2->bind_param("i", $objects->pid);
				$stmt2->execute();
				
				
				$stmt2->store_result();
				//check number of rows from query
				$numrows2 = $stmt2->num_rows;
				
			
				$stmt2->free_result();
				$stmt2->close();
				
				
				
				echo '<div class="group" title="Click a project to edit">';
				echo "<h4><span class='ptitle'>Name: </span>",$objects->pname,"</h4><div>";
				echo "<p class='pdesc pdata'><span class='pspan'>Description:</span> ",$objects->pdesc,"</p>";
				echo "<p class='pdate pdata'><span class='pspan'>Due Date:</span> ",$objects->pdate,"</p>";
				echo "<p class='pstatus pdata'><span class='pspan'>Status:</span> ",$objects->pstatus,"</p>";
				echo "<p><span class='orange'>This project contains (<span class='blue'>".$numrows2."</span>) tasks</span> </p>";
				echo "<p class='pdata nodisplay' name='pid' id='pID-".$objects->pid."'>".$objects->pid."</p>";
				echo "<p class='pdata nodisplay uid' name='uid'>".$objects->uid."</p>";
				echo '<p class="pdata"><div class="editicons"><a class="newt" href="#" onClick="newTask('.$objects->pid.');">NEW TASK&nbsp;<img id="newtask" src="images/plus-circle.png" title="Click for new project"/></a><a onClick="deleteProject('.$objects->pid.', '.$objects->uid.');" href="#"><img id="delproj" src="images/cross-circle.png" title="Click to Delete Project" /><span class="icontext">&nbsp;DELETE PROJECT</span></a></div></div></p></div>';
				
				}
				
				
				
			}

			exit;
			
	




?>