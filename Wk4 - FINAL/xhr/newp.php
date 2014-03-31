<?php
// Error reporting:
error_reporting(E_ALL^E_NOTICE);


//get db stuff
include_once('config.php');


	$pid = $_POST['npid'];
	$pname = $_POST['npname'];
	$pdesc = $_POST['npdesc'];
    $pdate = $_POST['ndateval'];
    $pstatus = $_POST['npstatus'];
	$uid = $_POST['neuid'];

	$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $db);
	
	$stmt = $mysqli->prepare("INSERT INTO `projects` (`pname`, `pdesc`, `pdate`, `pstatus`, `uid`) VALUES (?,?,?,?,?)") or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error(), E_USER_ERROR);

	$stmt->bind_param("ssssi", $pname, $pdesc, $pdate, $pstatus, $uid);
	$stmt->execute();
	$stmt->free_result();
	$stmt->close();	
	
	
	
	 //good login
			
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
	
				echo '<div class="group">';
				echo "<h4 title='Click a project to edit'><span class='ptitle'>Name: </span>",$objects->pname,"</h4><div>";
				echo "<p class='pdesc pdata'><span class='pspan'>Description:</span> ",$objects->pdesc,"</p>";
				echo "<p class='pdate pdata'><span class='pspan'>Due Date:</span> ",$objects->pdate,"</p>";
				echo "<p class='pstatus pdata'><span class='pspan'>Status:</span> ",$objects->pstatus,"</p>";
				echo "<p><span class='orange'>This project contains the following (<span class='blue'>".$numrows2."</span>) tasks:</span> </p>";
				
				//this project has sub tasks, go get them
				if ($numrows2 > 0) {
						//get tasks for pid
				
				$stmt = $mysqli->prepare('SELECT `tid`, `tname`, `tdesc`, `tdate`, `tstatus` from `tasks` where `pid` = ?');
				$stmt->bind_param("i", $objects->pid);
				$stmt->execute();
				
				$rows = array();
				$stmt->store_result();

				$stmt->bind_result( $row->tid, $row->tname, $row->tdesc, $row->tdate, $row->tstatus );
				while (mysqli_stmt_fetch($stmt)) {
					  $rows[] = $row;
					  $row = new stdClass();
					  mysqli_stmt_bind_result($stmt, $row->tid, $row->tname, $row->tdesc, $row->tdate, $row->tstatus);
				 }
			
				$stmt->free_result();
				$stmt->close();
				
				echo "<div class='subdiv'><ul class='subtaskul'>";
				
				foreach ($rows as $subt) {
					
					echo "<li class='subtask'><span class='pspan'>Task Name:&nbsp;</span>".$subt->tname."</li>";
					echo "<li class='subtask'><span class='pspan'>Task Description:&nbsp;</span>".$subt->tdesc."</li>";
					echo "<li class='subtask'><span class='pspan'>Due Date:&nbsp;</span>".$subt->tdate."</li>";
					echo "<li class='subtask'><span class='pspan'>Status:&nbsp;</span>".$subt->tstatus."</li>";
					echo "<li title='Click to Delete Task' class='subtask subicons'><a onClick='deleteTask(".$subt->tid.",".$objects->uid.");' href='#'><span class='red pspan'>DELETE TASK&nbsp;<img class='deltask' src='images/cross-circle.png'/></span></a></li>";
					echo "<hr style='height:1px; width:100%;'/>";
				
					}
				echo "</ul></div>";
				
				}else{
					
					echo "<p class='subtask'><span class='pspan'>No Tasks Found</span></p>";
				}
				
				echo "<p class='pdata nodisplay' name='pid' id='pID-".$objects->pid."'>".$objects->pid."</p>";
				echo "<p class='pdata nodisplay uid' name='uid'>".$objects->uid."</p>";
				echo '<p class="pdata"><div class="editicons"><a class="newt" href="#" title="Click to create a new task" onClick="newTask('.$objects->pid.','.$objects->uid.');">NEW TASK&nbsp;<img id="newtask" src="images/plus-circle.png" title="Click for new project"/></a><a onClick="deleteProject('.$objects->pid.', '.$objects->uid.');" href="#"><img id="delproj" src="images/cross-circle.png" title="Click to Delete Project" /><span class="icontext">&nbsp;DELETE PROJECT</span></a></div></div></p></div>';
				
				}
				
				
				
			}

			exit;
			
	




?>