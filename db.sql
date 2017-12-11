CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `adult` varchar(10) DEFAULT NULL,
  `backdrop_path` varchar(100) DEFAULT NULL,
  `genre_ids` text,
  `original_language` varchar(20) DEFAULT NULL,
  `original_title` varchar(100) DEFAULT NULL,
  `overview` text,
  `popularity` decimal(10,6) DEFAULT NULL,
  `poster_path` varchar(100) DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
	`title`	varchar(100)	DEFAULT	NULL,
	`video`	varchar(10)	DEFAULT	NULL,
	`vote_average` decimal(4,2) DEFAULT	NULL,
	`vote_count` int(11) DEFAULT NULL,
	PRIMARY KEY (`id`)
)
