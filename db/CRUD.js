class DB {

    // Get Departments
    get showDepartments() {
        return "SELECT * FROM department"
    }

    // Create new Department
    get createDepartment() {
        return "INSERT INTO department SET ?"
    }

    // Get Roles
    get showRoles() {
        return `SELECT role.id, role.title, department.name AS department, role.salary 
                FROM role 
                LEFT JOIN department on role.department_id = department.id;`
    }

    // Add new Role
    get createRole() {
        return "INSERT INTO role SET ?" 
    }

    // Get Employee
    get showEmployees() {
        return `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                FROM employee 
                LEFT JOIN role on employee.role_id = role.id 
                LEFT JOIN department on role.department_id = department.id 
                LEFT JOIN employee manager on manager.id = employee.manager_id;`
    }

    // Add new Employee
    get createEmployee() {
        return "INSERT INTO employee SET ?"
    }

    // Update Employee Role
    get updateRole() {
        return "UPDATE employee SET role_id = ? WHERE id = ?"
    }
}

module.exports = new DB();