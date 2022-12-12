CREATE DATABASE tigetDB;
USE tigetDB;

-- 사용자정보
create table if not exists user(
 username varchar(255) primary key,
 password varchar(255) not null,
 profile_image varchar(255),
 nickname varchar(20) unique not null,
 realname varchar(20) not null,
 birthdate varchar(255),
 tel varchar(20),
 level int,
 delete_date varchar(255)
);

-- 관심장르
create table if not exists genre_of_interest(
username	varchar(255)	NOT NULL,	
genre_code	varchar(20)	NOT NULL,	
PRIMARY KEY(username,genre_code)
);

-- 관심공연
create table if not exists concert_of_interest(
username	varchar(255)	NOT NULL,		
concert_code	integer	NOT NULL,	
PRIMARY KEY(username,concert_code)	
);

-- 관심아티스트
create table if not exists artist_of_interest(
username	varchar(255)	NOT NULL,	
artist_code	integer	NOT NULL,	
PRIMARY KEY(username,artist_code)
);

-- 공연정보
create table if not exists concert_info(
concert_code bigint auto_increment primary key,
concert_name varchar(225) not null,
concert_poster varchar(255),
start_date varchar(125) not null,
end_date varchar(125) not null,
concert_place varchar(225) not null,
concert_loc varchar(20) not null,
concert_ticketing varchar(225),
concert_type varchar(20),
concert_views int default 0
);

-- 공연-장르
create table if not exists genre_concert(
concert_code	varchar(20)	NOT NULL,	
genre_code	varchar(20)	NOT NULL,	
PRIMARY KEY(concert_code,genre_code)
);

-- 공연-아티스트
create table if not exists concert_artist(
concert_code	integer	NOT NULL,	
artist_code	integer	NOT NULL,	
PRIMARY KEY(concert_code,artist_code)
);

-- 아티스트
create table if not exists artist(
artist_code bigint auto_increment primary key,
artist_name	varchar(125)	NOT NULL,
artist_type	varchar(20),
artist_img varchar(255),	
artist_debut	varchar(12)
);

-- 아티스트-장르
create table if not exists artist_genre(
artist_code	integer	NOT NULL,	
genre_code	varchar(20)	NOT NULL,	
PRIMARY KEY(artist_code,genre_code)
);

-- 장르
create table if not exists genre(
genre_code	varchar(20)	NOT NULL	PRIMARY KEY,
genre_name	varchar(20)	NOT NULL
);

-- 이미지
create table if not exists image(
i_seq	BIGINT	AUTO_INCREMENT PRIMARY KEY,
i_url	VARCHAR(255)						
);

-- 게시판
create table if not exists board_detail (
seq bigint auto_increment primary key,
b_nickname varchar(255),
title varchar(255),
b_content text,
b_img varchar(255),
sort_board varchar(255),
b_update_date varchar(255),
b_modified_date varchar(255),
b_remove_date varchar(255)
);

-- 댓글
create table if not exists reply (
r_nickname varchar(255),
r_content varchar(255),
r_update_date varchar(255),
r_modified_date varchar(255),
r_remove_date varchar(255),
board_code bigint,
primary key (r_update_date, r_nickname)
);

-- 국경일목록
CREATE TABLE holiday(
h_dateName	VARCHAR(50)	NOT NULL,	
h_isHoliday	VARCHAR(50)	NOT NULL,	
h_locdate	INT	PRIMARY KEY,
h_seq	INT		
);