CREATE DATABASE content_db;
USE content_db;

CREATE TABLE posts (
    id INTEGER AUTO_INCREMENT,
    post_title varchar (100) NOT NULL,
    post_type varchar (50) NOT NULL,
    post_user varchar (100),
    post_body varchar (1000),
    post_image varchar (500) NOT NULL,
    time_created DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE comments (
    id INTEGER AUTO_INCREMENT,
    postId INTEGER NOT NULL,
    name VARCHAR (44) NOT NULL,
    email VARCHAR (44) NOT NULL,
    comment VARCHAR (300) NOT NULL,
    time_created DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY(id),
    FOREIGN KEY(postId) REFERENCES posts(id)
);