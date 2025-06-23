-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test_ecommerce
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `description` text,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'2025-05-17 19:00:42.000000','2025-05-17 19:00:42.000000','Khóa học giúp bạn giao tiếp tiếng Anh tự tin.','Tiếng Anh Giao Tiếp'),(2,'2025-05-17 19:00:42.000000','2025-05-17 19:00:42.000000','Khóa học tiếng Anh cho trẻ em.','Tiếng Anh Thiếu Nhi'),(3,'2025-05-17 19:00:42.000000','2025-05-17 19:00:42.000000','Khóa học luyện thi IELTS từ cơ bản đến nâng cao.','Luyện Thi IELTS');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_enrollments`
--

DROP TABLE IF EXISTS `course_enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_enrollments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `enrollment_date` datetime(6) DEFAULT NULL,
  `course_id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf78cq7ecdpk1clt1w5ofnb34t` (`course_id`),
  KEY `FKswryn18h8voi2bkseiqbaivr9` (`order_id`),
  KEY `FKn0jagyiydh9aqty8r055q3kka` (`user_id`),
  CONSTRAINT `FKf78cq7ecdpk1clt1w5ofnb34t` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `FKn0jagyiydh9aqty8r055q3kka` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKswryn18h8voi2bkseiqbaivr9` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_enrollments`
--

LOCK TABLES `course_enrollments` WRITE;
/*!40000 ALTER TABLE `course_enrollments` DISABLE KEYS */;
INSERT INTO `course_enrollments` VALUES (1,'2025-05-24 16:10:04.180675','2025-05-24 16:10:04.180675','2025-05-24 16:10:04.180675',1,1,1);
/*!40000 ALTER TABLE `course_enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_reviews`
--

DROP TABLE IF EXISTS `course_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `comment` text,
  `rating` int NOT NULL,
  `course_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK799g8dfcye3g51ru63bfdhyb1` (`course_id`),
  KEY `FK5rcljcnb4if64q6q8ilwn0w5k` (`user_id`),
  CONSTRAINT `FK5rcljcnb4if64q6q8ilwn0w5k` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK799g8dfcye3g51ru63bfdhyb1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_reviews`
--

LOCK TABLES `course_reviews` WRITE;
/*!40000 ALTER TABLE `course_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `description` text,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('ARCHIVED','DRAFT','PENDING_APPROVAL','PUBLISHED','REJECTED') NOT NULL,
  `title` varchar(255) NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `level_id` bigint DEFAULT NULL,
  `seller_id` bigint NOT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK72l5dj585nq7i6xxv1vj51lyn` (`category_id`),
  KEY `FK5h26i8gulbtggcwuqqkwh0yw1` (`level_id`),
  KEY `FKn56leyrwwdquydhhy13b9b1bg` (`seller_id`),
  CONSTRAINT `FK5h26i8gulbtggcwuqqkwh0yw1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  CONSTRAINT `FK72l5dj585nq7i6xxv1vj51lyn` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FKn56leyrwwdquydhhy13b9b1bg` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'2025-05-17 19:04:28.000000','2025-06-05 13:36:18.459335','Khóa học giúp bạn tự tin giao tiếp tiếng Anh hàng ngày.',800000.00,1000000.00,'PUBLISHED','Tiếng Anh Giao Tiếp Cơ Bản',1,1,2,'https://img.freepik.com/free-vector/online-english-lessons-youtube-thumbnail_23-2149291956.jpg'),(2,'2025-05-17 19:04:28.000000','2025-05-17 19:04:28.000000','Chiến lược và kỹ năng đạt IELTS 7.0+',1500000.00,2000000.00,'PUBLISHED','Luyện Thi IELTS 7.0+',2,2,2,NULL),(3,'2025-05-18 05:19:37.196552','2025-05-18 10:38:54.292442','Chương trình luyện đề sát đề, mẹo kỹ thuật làm bài Listening & Reading giúp bạn đạt 600+ điểm TOEIC chỉ trong 8 tuần.',800000.00,1000000.00,'PENDING_APPROVAL','Luyện thi TOEIC 600+ Online',3,2,2,NULL),(5,'2025-05-18 10:33:58.648552','2025-05-18 10:42:12.731742','Cải thiện kỹ năng nói trôi chảy với các chủ đề thảo luận từ thực tế, kèm phản hồi chi tiết từ giảng viên bản ngữ.',1100000.00,2400000.00,'DRAFT','Khóa học Tiếng Anh Giao Tiếp Nâng Cao',1,3,2,NULL),(6,'2025-06-05 09:57:07.197475','2025-06-05 09:57:07.197475','Luyện thi kỹ năng Reading tiêu chuẩn IELTS',3950000.00,4650000.00,'DRAFT','Luyện thi Reading tiêu chuẩn IELTS',3,2,1,NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_comments`
--

DROP TABLE IF EXISTS `lesson_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_comments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `content` text NOT NULL,
  `lesson_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc294lsbm7r4n3xyg9rgurh07k` (`lesson_id`),
  KEY `FKae19hwvklqllk5ws9bwtpo0x2` (`user_id`),
  CONSTRAINT `FKae19hwvklqllk5ws9bwtpo0x2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKc294lsbm7r4n3xyg9rgurh07k` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_comments`
--

LOCK TABLES `lesson_comments` WRITE;
/*!40000 ALTER TABLE `lesson_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `lesson_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `description` text,
  `file_url` varchar(255) DEFAULT NULL,
  `lesson_order` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `course_id` bigint NOT NULL,
  `is_preview` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK17ucc7gjfjddsyi0gvstkqeat` (`course_id`),
  CONSTRAINT `FK17ucc7gjfjddsyi0gvstkqeat` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (1,'2025-05-17 19:05:38.000000','2025-05-17 19:05:38.000000','Học cách chào hỏi trong tiếng Anh.',NULL,1,'Chào hỏi cơ bản','https://youtube.com/lesson1',1,_binary '\0'),(2,'2025-05-17 19:05:38.000000','2025-05-17 19:05:38.000000','Cách giới thiệu bản thân bằng tiếng Anh.',NULL,2,'Giới thiệu bản thân','https://youtube.com/lesson2',1,_binary '\0'),(3,'2025-05-17 19:05:38.000000','2025-05-17 19:05:38.000000','Kỹ năng làm bài Reading IELTS.',NULL,1,'Chiến lược làm Reading','https://youtube.com/ielts1',2,_binary '\0'),(4,'2025-05-17 19:05:38.000000','2025-05-17 19:05:38.000000','Thực hành Speaking IELTS.',NULL,2,'Luyện Speaking Part 1','https://youtube.com/ielts2',2,_binary '\0');
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `description` text,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES (1,'2025-05-17 19:00:46.000000','2025-05-17 19:00:46.000000','Dành cho người mới bắt đầu.','Beginner'),(2,'2025-05-17 19:00:46.000000','2025-05-17 19:00:46.000000','Dành cho người đã có nền tảng.','Intermediate'),(3,'2025-05-17 19:00:46.000000','2025-05-17 19:00:46.000000','Dành cho người học nâng cao.','Advanced');
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) NOT NULL,
  `course_id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtc2uxybe6r9ak6sd66whjd27` (`course_id`),
  KEY `FKjyu2qbqt8gnvno9oe9j2s2ldk` (`order_id`),
  CONSTRAINT `FKjyu2qbqt8gnvno9oe9j2s2ldk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKtc2uxybe6r9ak6sd66whjd27` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `payment_method` enum('BANK_TRANSFER','CREDIT_CARD','CRYPTO','PAYPAL') NOT NULL,
  `payment_status` enum('COMPLETED','FAILED','PENDING','REFUNDED') DEFAULT NULL,
  `status` enum('CANCELLED','COMPLETED','PENDING','REFUNDED') NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2025-05-24 16:10:04.150452','2025-05-24 16:10:04.150452','CREDIT_CARD','COMPLETED','COMPLETED',800000.00,1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'2025-05-16 17:11:13.257371','2025-05-16 17:11:13.257371','ADMIN'),(2,'2025-05-16 17:11:13.257371','2025-05-16 17:11:13.257371','STUDENT'),(3,'2025-05-17 19:02:48.000000','2025-05-17 19:02:48.000000','SELLER'),(4,'2025-05-24 15:17:30.913478','2025-05-24 15:17:30.913478','USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `is_verified` bit(1) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `reset_password_expires` datetime(6) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKovh8xmu9ac27t18m56gri58i1` (`google_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2025-05-16 10:12:03.559007','2025-05-16 10:12:03.559007',NULL,'admin@admin.com','admin',NULL,_binary '\0','$2a$10$3lHuPxo0O4Gn2ijDreUKM.CsnIfH7GGbixc4QWGS0AGYnIughpBQa',NULL,NULL,NULL),(2,'2025-05-17 19:03:12.000000','2025-05-17 19:03:12.000000','TP.HCM','seller@english.com','English Seller',NULL,_binary '','seller123','0987654321',NULL,NULL),(3,'2025-05-17 19:03:12.000000','2025-05-17 19:03:12.000000','Đà Nẵng','student@english.com','Student One',NULL,_binary '','student123','0111222333',NULL,NULL),(4,'2025-05-26 16:18:05.555435','2025-05-26 16:18:05.555435','example 10 street','example@gmail.com','John Query',NULL,_binary '\0','$2a$10$L9xqqyIYHT/fQkn2UOtcseVD1pt5ivaVCALChY8lSf1Wp7jv3m/ii','123 456 789',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `user_id` bigint NOT NULL,
  `roles_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`roles_id`),
  KEY `FKa62j07k5mhgifpp955h37ponj` (`roles_id`),
  CONSTRAINT `FK2o0jvgh89lemvvo17cbqvdxaa` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKa62j07k5mhgifpp955h37ponj` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES (1,1),(2,2),(3,3),(4,4);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-05 23:28:58
