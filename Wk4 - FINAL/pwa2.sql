-- MySQL dump 10.13  Distrib 5.1.73, for redhat-linux-gnu (x86_64)
--
-- Host: localhost    Database: pwa2
-- ------------------------------------------------------
-- Server version	5.1.73-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `pid` int(9) NOT NULL AUTO_INCREMENT,
  `pname` varchar(255) NOT NULL,
  `pdesc` varchar(255) NOT NULL,
  `pdate` date NOT NULL,
  `pstatus` enum('Urgent','Normal','Delayed','Finished') NOT NULL,
  `uid` int(3) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=latin1 COMMENT='Projects table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Project One','One Descrrriptions afw11 1111 1111 1dd ','2014-03-29','Delayed',3),(2,'Project Two','This is the second project finished on March 31 2014 ss ss','2014-03-25','Finished',3),(3,'Project User 2','User 2 Project','2014-03-20','Delayed',2),(61,'Popopo Poo','FDD sdde fefef','2014-03-25','Normal',7),(63,'Po Po Two Po','Po Po Po Description','2014-03-30','Delayed',7),(65,'New Project Name','New Description','2014-03-03','Finished',8),(69,'Lodss eW dd','New Dsw as a','2014-03-02','Normal',9),(75,'New Project Name','New Description','2014-03-08','Delayed',11),(76,'Project Three 3','Some desc','2014-03-22','Normal',3);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `tid` int(9) NOT NULL AUTO_INCREMENT,
  `tname` varchar(255) NOT NULL,
  `tdesc` varchar(255) NOT NULL,
  `tdate` date NOT NULL,
  `tstatus` enum('Urgent','Normal','Delayed','Finished') NOT NULL,
  `pid` int(9) NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COMMENT='Task table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (2,'Proj1 Task2','Project 1 - Task 2','2014-03-25','Urgent',1),(3,'proj 2 task','task data for proj two','2014-03-25','Normal',2),(5,'p2 t2','p2 t2 desc','2014-03-17','Normal',2),(6,'p3 task one','p3 t1','2014-03-23','Urgent',74),(7,'New Task Name','New Task Description','2014-03-08','Finished',1);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(32) NOT NULL,
  `regdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COMMENT='user table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aaa','asdf@asddf.com','0b4e7a0e5fe84ad35fb5f95b9ceeac79','2014-03-18 18:38:01'),(2,'awww','qqqq@qq.com','dc647eb65e6711e155375218212b3964','2014-03-18 18:38:34'),(3,'bob','bob@bob.com','e8557d12f6551b2ddd26bbdd0395465c','2014-03-19 14:42:28'),(4,'jojo','jojo@jo.com','d0bafb7185f2acfd371c566cbae25af9','2014-03-21 14:13:31'),(7,'popo','popo@po.com','4d2b31c91d33a32a98584546736d5c73','2014-03-27 17:39:58'),(8,'john','jack@jj.com','4297f44b13955235245b2497399d7a93','2014-03-27 19:53:06'),(9,'qq','qq@qq.com','343b1c4a3ea721b2d640fc8700db0f36','2014-03-27 20:27:28'),(10,'new','new@ne.com','343b1c4a3ea721b2d640fc8700db0f36','2014-03-29 13:15:24'),(11,'sww','sww@sww.com','96e79218965eb72c92a549dd5a330112','2014-03-29 13:18:46');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-03-29 18:28:03
