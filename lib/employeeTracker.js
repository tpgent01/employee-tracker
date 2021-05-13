// get inquirer
const inquirer = require('inquirer');
// get console table 
const cTable = require('console.table');
// get the MySQL client
const mysql = require('mysql2');
// get sql my queries
const crud = require('../db/CRUD');
 
// create the connection to database
const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Pokemon23?', 
    database: 'company_db'
});

// employee tracker class
class EmployeeTracker {
    constructor() {
    }

    // initialize employee tracker
    initializeEmployeeTracker() {

        // application title card
        console.log(crud.title)

        //open tracker menu
        this.trackerMenu()

    }

    // calls up a menu with the application options
    trackerMenu() {
        // prompt user to select an option
        inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'selection',
            choices: [
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'View employees by manager', 
                'View employees by department (with budget totals)', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role', 
                'Delete a department', 
                'Delete a role', 
                'Delete an employee',
                'Exit this application'
            ]
        })
        // send to the correct function based on the selection
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
            case 'View employees by department (with budget totals)':
                this.viewAllEmployeesByDepartment();
                break;
            case 'Add a department':
                this.addDepartment();
                break;
            case 'Add a role':
                this.addRole();
                break;
            case 'Add an employee':
                this.addEmployee();
                break;
            case 'Update an employee role':
                this.updateEmployeeRole();
                break;
            case 'Delete a department':
                this.deleteDepartment();
                break;
            case 'Delete a role':
                this.deleteRole();
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

    // function to query the database and console log results
    displayQuery(query) {
        con.promise().query(query)
        .then( ([rows,fields]) => {
            // console log results
            console.log(`
` + cTable.getTable(rows));
            // return back to the tracker menu
            this.trackerMenu();
        })
        .catch(console.log)
    };

    // view departments
    viewAllDepartments() {
        // query all departments
        this.displayQuery(crud.findDepartments);
    };

    // view roles
    viewAllRoles() {
        // query all  roles
        this.displayQuery(crud.findRoles);
    };

    // view employees
    viewAllEmployees() {
        // query all employees along with their role, salary, department, and manager
        this.displayQuery(crud.findEmployees); 
    };

    // view employees by manager
    viewAllEmployeesByManager() {
        // query for current employees
        con.promise().query(crud.findEmployees)
        .then( ([rows,fields]) => {
            // map employees to set up manager choices
            const managerChoices = rows.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: `${first_name} ${last_name}`
            }));

            // add a selection for no manager and set it's value to null
            managerChoices.unshift({ name: "No Manager", value: null });

            const employees = rows;
            
            // now that we have all the available choices, select a manager
            inquirer
            .prompt([
                {
                    name: "name",
                    type: "list",
                    message: "Select a manager",
                    choices: managerChoices
                },
            ])

            // pass values from the prompt object
            .then((managerSelection) => {
                
                //filter the employees by manager id
                const result = employees.filter(employee => employee.manager === managerSelection.name)

                // catch employees that aren't currently managing anyone
                if(!result[0]){
                    console.log(`
                    
                    ${managerSelection.name} doesn't manage any employees
                    
                    `)
                // display results
                } else {
                    console.log(cTable.getTable(result));
                }

                //open employee menu
                this.trackerMenu();
            });
            
        })
        .catch(console.log)
        
    };

    // view employees by department
    viewAllEmployeesByDepartment() {
        // query for current employees
        con.promise().query(crud.findEmployees)
        .then( ([rows,fields]) => {

            const employees = rows;
            // query for departments
            con.promise().query(crud.findDepartments)
            .then( ([rows,fields]) => {
                // map department names
                const departmentChoices = rows.map(({ id, name }) => ({
                    name: `${name}`,
                    value: `${name}`
                }));

                // now that we have all the available choices, select a department
                inquirer
                .prompt([
                    {
                        name: "name",
                        type: "list",
                        message: "Select a department",
                        choices: departmentChoices
                    },
                ])

                // pass values from the prompt object
                .then((departmentSelection) => {
                    
                    //filter the employees by department id
                    const result = employees.filter(employee => employee.department === departmentSelection.name)
                    
                    // calculate department budget
                    let budget = 0;
                    result.forEach(employee => {
                        budget = budget + parseInt(employee.salary);
                    });
                    // catch departments that are currently vacant
                    if(!result[0]){
                        console.log(`
                        
                        ${departmentSelection.name} currently has no employees
                        
                        `)
                    // display results
                    } else {
                        console.log(cTable.getTable(result) + `Total Utilized ${departmentSelection.name} Budget: ${budget}
                        `);
                    }

                    //open employee menu
                    this.trackerMenu();
                });
            })
            .catch(console.log)
        })
        .catch(console.log)
    };

    // add department
    addDepartment() {
        // get the department name
        inquirer
        .prompt([
            {
                type: 'text',
                name: 'name',
                message: "What is the name of this department?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("The department's name is required.");
                        return false;
                    }
                }
            }
        ])

        // pass values from the prompt object
        .then((newDepartment) => {
            
            // add to database
            con.query(crud.createDepartment, newDepartment)
            // let the user know something happened
            console.log(`
            ${newDepartment.name} was added to the database
            
            `)

            //open employee menu
            this.trackerMenu();
        });
    };

    // add role
    addRole() {
        // get department choices
        con.promise().query(crud.findDepartments)
        .then( ([rows,fields]) => {
            const departmentChoices = rows.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            
            
        // now that we have all the available choices, get the employee information
        inquirer
        .prompt([
            {
                type: 'text',
                name: 'title',
                message: "What is this role's title?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("The role's title is required.");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'salary',
                message:  "What is this role's salary? (numbers only)",
                validate: nameInput => {
                    if (nameInput && !isNaN(nameInput)) {
                        return true;
                    } else {
                        console.log("This role's salary is required. Please use only numbers without , seperators.");
                        return false;
                    }
                }
            },
            {
                name: "department_id",
                type: "list",
                message: "Select this role's department?",
                choices: departmentChoices
            }
        ])

        // pass values from the prompt object
        .then((newRole) => {
            
            // add to database
            con.query(crud.createRole, newRole)

            // let the user know something happened
            console.log(`
            ${newRole.title} was added to the database
            
            `)

            //open employee menu
            this.trackerMenu();
        });

        })
        .catch(console.log)
    };

    // add an employee
    addEmployee() {
        // query for current employees
        con.promise().query(crud.findEmployees)
        .then( ([rows,fields]) => {
            // map employees to set up manager choices
            const managerChoices = rows.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            // ad a selection for none and set it's value to null
            managerChoices.unshift({ name: "None", value: null });

            // get role choices
            con.promise().query(crud.findRoles)
            .then( ([rows,fields]) => {
                const roleChoices = rows.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));
                
                
            // now that we have all the available choices, get the employee information
            inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'first_name',
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
                    name: 'last_name',
                    message:  "What is the employee's last name?",
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log("The employee's last name is required.");
                            return false;
                        }
                    }
                },
                {
                    name: "role_id",
                    type: "list",
                    message: "Select the employee's role?",
                    choices: roleChoices
                },
                {
                    name: "manager_id",
                    type: "list",
                    message: "Select the employee's manager",
                    choices: managerChoices
                },
            ])

            // pass values from the prompt object
            .then((newEmployee) => {
                
                // add to database
                con.query(crud.createEmployee, newEmployee)
                
                // let the user know something happened
                console.log(`
                ${newEmployee.first_name} ${newEmployee.last_name} was added to the database
                
                `)

                //open employee menu
                this.trackerMenu();
            });

            })
            .catch(console.log)
        })
        .catch(console.log)
    };

    // update an employee role
    updateEmployeeRole() {
        // query for current employees
        con.promise().query(crud.findEmployees)
        .then( ([rows,fields]) => {
            // map employees to set up employee choices
            const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            // query for role choices
            con.promise().query(crud.findRoles)
            .then( ([rows,fields]) => {
                const roleChoices = rows.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));
                
            // now that we have all the available choices, make selections
            inquirer
            .prompt([
                {
                    name: "employee_id",
                    type: "list",
                    message: "Select the employee who's role you wish to change.",
                    choices: employeeChoices
                },{
                    name: "role_id",
                    type: "list",
                    message: "Select the employee's new role.",
                    choices: roleChoices
                }
            ])

            // pass values from the prompt object
            .then((newRole) => {
                
                // add to database
                con.query(crud.updateRole, [newRole.role_id, newRole.employee_id])

                // let user know it was successful
                console.log(`
                Employee role was updated.
                
                `)

                //open employee menu
                this.trackerMenu();
            });

            })
            .catch(console.log)
        })
        .catch(console.log)
    };

    // delete a department
    deleteDepartment() {
        // get department choices
        con.promise().query(crud.findDepartments)
        .then( ([rows,fields]) => {
            const departmentChoices = rows.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            
            
        // now that we have all the available choices, get the employee information
        inquirer
        .prompt([
            {
                name: "department_id",
                type: "list",
                message: "Select a department to delete",
                choices: departmentChoices
            }
        ])

        // pass values from the prompt object
        .then((delDept) => {
            
            // add to database
            con.query(crud.removeDepartment, delDept.department_id)

            // let the user know something happened
            console.log(`
            department_id ${delDept.department_id} was removed from the database
            
            `)

            //open employee menu
            this.trackerMenu();
            });

        })
        .catch(console.log)
    };

    // delete a role
    deleteRole() {
        // get role choices
        con.promise().query(crud.findRoles)
        .then( ([rows,fields]) => {
            const roleChoices = rows.map(({ id, title }) => ({
                name: title,
                value: id
            }));
                
                
            // now that we have all the available choices, get the employee information
            inquirer
            .prompt([
                {
                    name: "role_id",
                    type: "list",
                    message: "Select a role to delete",
                    choices: roleChoices
                }
            ])
    
            // pass values from the prompt object
            .then((delRole) => {
                
                // remove from database
                con.query(crud.removeRole, delRole.role_id)
                
                // let the user know something happened
                console.log(`
    
                role_id ${delRole.role_id} was removed from the database
                
                `)
    
                //open employee menu
                this.trackerMenu();
            });
    
        })
        .catch(console.log)
    };

    // delete an employee
    deleteEmployee() {
        // get employee choices
        con.promise().query(crud.findEmployees)
        .then( ([rows,fields]) => {
            const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
                
                
            // now that we have all the available choices, get the employee information
            inquirer
            .prompt([
                {
                    name: "employee_id",
                    type: "list",
                    message: "Select an employee to remove",
                    choices: employeeChoices
                }
            ])
    
            // pass values from the prompt object
            .then((delEmployee) => {
                
                // remove from database
                con.query(crud.removeEmployee, delEmployee.employee_id)
                
                // let the user know something happened
                console.log(`
    
                employee_id ${delEmployee.employee_id} was removed from the database
                
                `)
    
                //open employee menu
                this.trackerMenu();
            });
    
        })
        .catch(console.log)
    };

    // exit the application
    exitTracker() {
        // say goodbaye
        console.log(crud.goodbye);
        con.end();
    };
}

module.exports = EmployeeTracker;