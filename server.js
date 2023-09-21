const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require('cfonts');

// create a MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeeTracker_db",
});

// connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
    // start the application
    start();
});

cfonts.say('Truccos \nSQL Employee Tracker', {
	font: 'block',              
	align: 'left',              
	colors: ['blue'],         
	background: 'transparent',  
	letterSpacing: 1,           
	lineHeight: 1,              
	space: true,                
	maxLength: '0',             
	gradient: false,            
	independentGradient: false, 
	transitionGradient: false,  
	env: 'node'
});

// Starts the tracker application
function start() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Add a Manager",
                "Update an employee role",
                "View Employees by Manager",
                "View Employees by Department",
                "Delete Departments | Roles | Employees",
                "View the total utilized budget of a department",
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                    case "Add a Manager":
                        addManager();
                        break;
                    case "Update an employee role":
                        updateEmployeeRole();
                        break;
                    case "View Employees by Manager":
                        viewEmployeesByManager();
                        break;
                    case "View Employees by Department":
                        viewEmployeesByDepartment();
                        break;
                    case "Delete Departments | Roles | Employees":
                        deleteDepartmentsRolesEmployees();
                        break;
                    case "View the total utilized budget of a department":
                        viewTotalUtilizedBudgetOfDepartment();
                        break;
                    case "Exit":
                        connection.end();
                        console.log("Goodbye!");
                        break;
                }
            });
    }

    function viewAllDepartments() {
        const query = "SELECT * FROM departments";
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            // restart the application
            start();
        });
    }
    
    function viewAllRoles() {
        const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id";
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            // restart the application
            start();
        });
    }

    function viewAllEmployees() {
        const query = `
        SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
        FROM employee e
        LEFT JOIN roles r ON e.role_id = r.id
        LEFT JOIN departments d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id;
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            // restart the application
            start();
        });
    }

    function addDepartment() {
        inquirer
            .prompt({
                type: "input",
                name: "name",
                message: "Enter the name of the new department:",
            })
            .then((answer) => {
                console.log(answer.name);
                const query = `INSERT INTO departments (department_name) VALUES ("${answer.name}")`;
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    console.log(`Added department ${answer.name} to the database!`);
                    // restart the application
                    start();
                    console.log(answer.name);
                });
            });
    }
    