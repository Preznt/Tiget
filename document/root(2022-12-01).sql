CREATE DATABASE tigetDB;
USE tigetDB;

-- 사용자정보
create table if not exists user(
 username varchar(256) primary key ,
 profile_image varchar(256) ,
 nickname varchar(20) unique not null,
 birthdate varchar(256) not null,
 level int not null
);

-- 관심장르
create table if not exists genre_of_interest(
username	varchar(256)	NOT NULL,	
genre_code	varchar(20)	NOT NULL,	
			PRIMARY KEY(username,genre_code)
);

-- 관심공연
create table if not exists concert_of_interest(
username	varchar(256)	NOT NULL,		
concert_code	varchar(20)	NOT NULL,	
			PRIMARY KEY(username,concert_code)	
);

-- 관심아티스트
create table if not exists artist_of_interest(
username	varchar(256)	NOT NULL,	
artist_code	varchar(20)	NOT NULL,	
			PRIMARY KEY(username,artist_code)
);

-- 장르
create table if not exists genre(
genre_code	varchar(20)	NOT NULL	PRIMARY KEY,
genre_name	varchar(20)	NOT NULL
);

-- 공연-장르
create table if not exists genre_concert(
concert_code	varchar(20)	NOT NULL,	
genre_code	varchar(20)	NOT NULL,	
			PRIMARY KEY(concert_code,genre_code)
);

-- 공연-아티스트
create table if not exists concert_artist(
concert_code	varchar(20)	NOT NULL,	
artist_code	varchar(20)	NOT NULL,	
			PRIMARY KEY(concert_code,artist_code)
);

-- 아티스트
create table if not exists artist(
artist_code	varchar(20)	NOT NULL,
artist_name	varchar(125)	NOT NULL,
artist_type	varchar(20),
artist_img varchar(256),	
year_debut	varchar(12),	
genre_name	varchar(20)	
);

-- 공연정보
create table if not exists concert_info(
concert_code int auto_increment primary key,
concert_name varchar(125) not null,
concert_artist varchar(125) not null,
concert_poster varchar(256) ,
start_date varchar(125) not null,
end_date varchar(125) not null,
concert_place varchar(125) not null,
price varchar(125) not null
);

-- 이미지
create table if not exists image(
i_seq	BIGINT	AUTO_INCREMENT PRIMARY KEY,
i_url	VARCHAR(256)						
);

-- 게시판
create table if not exists board_detail (
seq bigint auto_increment primary key,
b_nickname varchar(256),
title varchar(256),
b_content text,
b_img varchar(256),
sort_board varchar(256),
b_update_date varchar(256) ,
b_modified_date varchar(256),
b_remove_date varchar(256)
);

-- 댓글
create table if not exists reply (
r_nickname varchar(256),
r_content varchar(256),
r_update_date varchar(256),
r_modified_date varchar(256),
r_remove_date varchar(256),
board_code bigint,
primary key (r_update_date, r_nickname)
);

-- 국경일목록
CREATE TABLE holiday(
h_dateName	VARCHAR(50)	NOT NULL,	
h_isHoliday	VARCHAR(50)	NOT NULL,	
h_locdate	INT	NOT NULL	PRIMARY KEY,
h_seq	INT		
);