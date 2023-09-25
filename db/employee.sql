CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
    -- FOREIGN KEY(role_id)
    -- REFERENCES role(id),
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)