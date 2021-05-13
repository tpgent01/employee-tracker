const inquirer = require('inquirer');

class EmployeeTracker {
    constructor() {
        this.manager;
        this.employees = [];
        // this.interns = [];
    }

    // initialize employee tracker
    initializeEmployeeTracker() {
        // application title card
        console.log(
`
+-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+
|E| |M| |P| |L| |O| |Y| |E| |E|
+-+ +-+ +-+ +-+ +-+ +-+ +-+ +-+
  +-+ +-+ +-+ +-+ +-+ +-+ +-+    
  |M| |A| |N| |A| |G| |E| |R|    
  +-+ +-+ +-+ +-+ +-+ +-+ +-+
         version 1.0
         
     by J. Scott Rumptz
     
`)

        //open tracker menu
        this.trackerMenu()

    }

    // a menu with the application options
    trackerMenu() {
        // prompt user to select an option
        inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'selection',
            choices: ['View all departments', 'View all roles', 'View all employees', 'View employees by manager', 'View employees by department', 'View the total utilized budget of a department', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Delete a department', 'Delete a role', 'Delete an employee','Exit this application']
        })
        .then(({selection}) => {
            switch (selection) {
            case 'View all departments':
                this.viewAllDepartments();
                break;
            case 'View all roles':
                this.viewAllRoles();
                break;
            case 'View all employees':
                this.viewAllEmployees();
                break;
            case 'View employees by manager':
                this.viewAllEmployeesByManager();
                break;
            case 'View employees by department':
                this.viewAllEmployeesByDepartment();
                break;
            case 'View the total utilized budget of a department':
                this.viewTotalBudget();
                break;
            case 'Add a department':
                this.addDepartment();
                break;
            case 'Add a roll':
                 this.addRoll();
                break;
            case 'Add an employee':
                this.addEmployee();
                break;
            case 'Update an employee role':
                this.updateEmployeeRoll();
                break;
            case 'Delete a department':
                this.deleteDepartment();
                break;
            case 'Delete a roll':
                    this.deleteRoll();
                break;
            case 'Delete an employee':
                this.deleteEmployee();
                break;
            case 'Exit this application':
                this.exitTracker();
                break;
            };
        });
    };

    // view departments
    // view roles
    // view employees
    // view employees by manager
    // view employees by department
    // view total budget
    // add department
    // add role

    // add employee
    addEmployee() {
        // get employee information
        inquirer
        .prompt([
            {
                type: 'text',
                name: 'firstName',
                message: "What is the employee's first name?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("The employee's first name is required.");
                        return false;
                    }
                }
            },
            {
                type: 'text',
                name: 'lastName',
                message:  "What is the employee's last name?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("The employee's last name is required.");
                        return false;
                    }
                }
            }
        ])

        // destructure values from the prompt object
        .then(({firstName, lastName}) => {

            // add to database
            console.log(`${firstName} ${lastName} added to the data base`)

            //open employee menu
            this.trackerMenu();
        });
    }

    // update employee role
    // delete department
    // delete roll
    // delete employee

    // exit application
    exitTracker() {
        // say goodbaye
        console.log ('Goodbye!');
    }
}

module.exports = EmployeeTracker;