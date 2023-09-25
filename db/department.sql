CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
insert into department(name)
values ('Management'),
       ('Engineering'),
       ('Accounting'),
       ('Marketing'),
       ('Human Resources');