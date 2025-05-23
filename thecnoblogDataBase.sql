create database technoblog;
use technoblog;
create table usuarios(
nome varchar(50) not null,
email varchar(250) primary key,
senha varchar(150) not null
);

create table posts(
id int primary key,
email_usuario varchar(250) not null,
texto varchar(1500) not null,
foreign key(email_usuario) references usuarios(email),
imagem longblob
);

alter table posts add column titulo varchar(50) not null;
