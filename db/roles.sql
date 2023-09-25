CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
  -- FOREIGN KEY(department_id)
  -- REFERENCES department(id)
);
insert into role(title, salary, department_id) values('Manager', 5000000, 1);
insert into role(title, salary, department_id) values('Engineer', 1000000, 2);
insert into role(title, salary, department_id) values('Accountant', 4000000, 3);
insert into role(title, salary, department_id) values('Designer', 3000000, 4);
insert into role(title, salary, department_id) values('Administration', 2000000, 5);