--
-- File generated with SQLiteStudio v3.3.3 on mer giu 8 18:17:26 2022
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Exam
CREATE TABLE Exams (code VARCHAR (7) PRIMARY KEY NOT NULL, name VARCHAR (250) NOT NULL, credits INT NOT NULL, capacity INT, currentStudentsNumber INT NOT NULL, preparatory VARCHAR (7), incompatible VARCHAR (239));
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01URSPD', 'Internet Video Streaming', 						6, 	2, 		2, NULL, 		NULL);
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01OUZPD', 'Model based software design', 					4, 	NULL, 	1, NULL, 		NULL);
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01URROV', 'Computational intelligence', 					6, 	NULL, 	1, NULL, 		NULL);
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('03UEWOV', 'Challenge', 									5, 	NULL, 	1, NULL, 		NULL);
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01TYDOV', 'Software networking', 							7, 	NULL, 	1, NULL, 		NULL);
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01SQOOV', 'Reti Locali e Data Center', 					6, 	NULL, 	1, NULL, 		NULL);
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01NYHOV', 'System and device programming', 				6, 	3, 		3, NULL, 		'02GRSOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('02GRSOV', 'Programmazione di sistema', 					6, 	NULL, 	0, NULL, 		'01NYHOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01TXSOV', 'Web Applications II', 							6, 	NULL, 	0, '01TXYOV', 	NULL);
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01TXYOV', 'Web Applications I', 							6, 	3, 		0, NULL, 		'01UDFOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01UDFOV', 'Applicazioni Web I', 							6, 	NULL, 	0, NULL, 		'01TXYOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('04GSPOV', 'Software engineering', 							6, 	NULL, 	1, '02LSEOV', 	'05BIDOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('05BIDOV', 'Ingegneria del software', 						6, 	NULL, 	0, '02GOLOV', 	'04GSPOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01UDUOV', 'Sicurezza dei sistemi informativi', 			12, NULL, 	0, NULL, 		'01TYMOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01TYMOV', 'Information systems security services', 		12, NULL, 	1, NULL, 		'01UDUOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('02KPNOV', 'Tecnologie e servizi di rete', 					6, 	3, 		0, NULL, 		'01OTWOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01OTWOV', 'Computer network technologies and services', 	6, 	3, 		1, NULL, 		'02KPNOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01SQMOV', 'Data Science e Tecnologie per le Basi di Dati', 8, 	NULL, 	2, NULL, 		'01SQJOV-01SQLOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01SQLOV', 'Database systems', 								8, 	NULL, 	0, NULL, 		'01SQJOV-01SQMOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('01SQJOV', 'Data Science and Database Technology', 			8, 	NULL, 	0, NULL, 		'01SQLOV-01SQMOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('02LSEOV', 'Computer architectures', 						12, NULL, 	2, NULL, 		'02GOLOV');
INSERT INTO Exams (code, name, credits, capacity, currentStudentsNumber, preparatory, incompatible) VALUES ('02GOLOV', 'Architetture dei sistemi di elaborazione', 		12, NULL, 	0, NULL, 		'02LSEOV');

-- Table: Student
CREATE TABLE Students (id INTEGER PRIMARY KEY NOT NULL, name VARCHAR (100) NOT NULL, surname VARCHAR (100) NOT NULL, username VARCHAR (250) NOT NULL, hash VARCHAR (64) NOT NULL, salt VARCHAR (32) NOT NULL, career VARCHAR (10));
INSERT INTO Students (id, name, surname, username, hash, salt, career) VALUES (1, 'Giulia', 'Mannaioli', 'giulia.mannaioli@studenti.darkmagic.it', 'e06a2f2073a3d66d1ca4fd6ce04c64fe684ea19c27660b05e2fbf7269ce9ff42', '72e4eeb14def3b21', 'Full Time');
INSERT INTO Students (id, name, surname, username, hash, salt, career) VALUES (2, 'Virginia', 'Mazzei', 'virginia.mazzei@studenti.darkmagic.it', 'ac28edf49ba34ac83c17145375a030b4579ffddf3fe1dbb68f530bb3ca4ce514', 'a8b618c717683608', 'Part Time');
INSERT INTO Students (id, name, surname, username, hash, salt, career) VALUES (3, 'Marta', 'De Lellis', 'marta.delellis@studenti.darkmagic.it', '4b76e4c9e6c7af37e1bb8816ac6164d6e0e83c081481b7d88179aca217f9c9d6', '64c627a0d4aa272c', 'Full Time');
INSERT INTO Students (id, name, surname, username, hash, salt, career) VALUES (4, 'Luca', 'Zanetti', 'luca.zanetti@studenti.darkmagic.it', 'e06a2f2073a3d66d1ca4fd6ce04c64fe684ea19c27660b05e2fbf7269ce9ff42', '72e4eeb14def3b21', NULL);
INSERT INTO Students (id, name, surname, username, hash, salt, career) VALUES (5, 'Edoardo', 'Pelosin', 'edoardo.pelosin@studenti.darkmagic.it', 'ac28edf49ba34ac83c17145375a030b4579ffddf3fe1dbb68f530bb3ca4ce514', 'a8b618c717683608', NULL);

-- Table: StudyPlan
CREATE TABLE StudyPlans (id INTEGER NOT NULL REFERENCES Student (id), code VARCHAR (7) NOT NULL REFERENCES Exam (code), PRIMARY KEY (id, code));

-- Giulia Mannaioli
INSERT INTO StudyPlans (id, code) VALUES (1, '02GOLOV');
INSERT INTO StudyPlans (id, code) VALUES (1, '01SQMOV');
INSERT INTO StudyPlans (id, code) VALUES (1, '04GSPOV');
INSERT INTO StudyPlans (id, code) VALUES (1, '01TXYOV');
INSERT INTO StudyPlans (id, code) VALUES (1, '02GRSOV');

-- Marta De Lellis
INSERT INTO StudyPlans (id, code) VALUES (2, '01URSPD');
INSERT INTO StudyPlans (id, code) VALUES (2, '04GSPOV');
INSERT INTO StudyPlans (id, code) VALUES (2, '01TYMOV');
INSERT INTO StudyPlans (id, code) VALUES (2, '02KPNOV');
INSERT INTO StudyPlans (id, code) VALUES (2, '01OTWOV');
INSERT INTO StudyPlans (id, code) VALUES (2, '01SQOOV');
INSERT INTO StudyPlans (id, code) VALUES (2, '01TYDOV');
INSERT INTO StudyPlans (id, code) VALUES (2, '01SQMOV');
INSERT INTO StudyPlans (id, code) VALUES (2, '03UEWOV');

-- Virginia Mazzei
INSERT INTO StudyPlans (id, code) VALUES (3, '01NYHOV');
INSERT INTO StudyPlans (id, code) VALUES (3, '02LSEOV');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
