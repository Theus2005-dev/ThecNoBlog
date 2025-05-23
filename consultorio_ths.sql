create database consultorio_ths;

use consultorio_ths;
-- criacao de tabelas
create table paciente(
 codigo int auto_increment primary key,
 nome_completo varchar(100) not null,
 data_nasc date not null,
 cpf varchar(11) not null unique,
 telefone varchar(10) not null unique
);

create table especialidade(
 codigo int auto_increment primary key,
 nome varchar(50)
);

create table medico(
	codigo int auto_increment primary key,
    nome_completo varchar(100) not null,
    crm varchar(9) not null,
    telefone varchar(10) not null,
    cod_especialidade int not null,
    foreign key (cod_especialidade) references especialidade(codigo)
);

create table consulta(
	num_agendamento int primary key auto_increment,
    cod_paciente int not null,
    cod_medico int not null,
    data_consulta date not null,
    hora_consulta time not null,
    foreign key (cod_paciente) references paciente(codigo),
    foreign key (cod_medico) references medico (codigo)
);

-- inserir dados

INSERT INTO paciente (nome_completo, data_nasc, cpf, telefone) VALUES
('Ana Paula Ferreira', '1990-03-15', '12345678901', '1198765432'),
('Bruno Alves Lima', '1985-07-22', '23456789012', '2198765432'),
('Carla Mendes Rocha', '1992-11-08', '34567890123', '3198765432'),
('Daniel Souza Pinto', '1978-04-03', '45678901234', '4198765432'),
('Elaine Costa Dias', '2000-12-25', '56789012345', '5198765432'),
('Felipe Gomes Martins', '1995-06-30', '67890123456', '6198765432'),
('Gabriela Nunes Silva', '1988-01-17', '78901234567', '7198765432'),
('Henrique Lopes Vieira', '1999-10-10', '89012345678', '8198765432'),
('Isabela Ramos Tavares', '2001-05-19', '90123456789', '9198765432'),
('João Pedro Monteiro', '1983-09-27', '01234567890', '9998765432');

INSERT INTO especialidade (nome) VALUES
('Clínico Geral'),
('Pediatria'),
('Cardiologia'),
('Dermatologia'),
('Ortopedia'),
('Ginecologia'),
('Neurologia'),
('Psiquiatria'),
('Endocrinologia'),
('Oftalmologia');

