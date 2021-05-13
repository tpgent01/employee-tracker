USE employees;

INSERT INTO department (name)
VALUES
 ('Sales'),
 ('Human Resources'),
 ('Marketing'),
 ('IT'),
 ('Accounting');


INSERT INTO role (title, salary, department_id)
VALUES
 ('Sales Manager', 50000, 1),
 ('Sales Rep', 40000, 1),
 ('HR Manager', 85000, 2),
 ('HR Admin', 50000, 2),
 ('Marketing Director', 140000, 3),
 ('Marketing Admin', 65000, 3),
 ('IT Director', 195000, 4),
 ('Desktop Support', 100000, 4),
 ('Accounting Manager', 110000, 5),
 ('Accountant', 90000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
 ('Taylor', 'Gentry', 7, NULL),
 ('Kelsey', 'Collins', 1, NULL),
 ('Connor', 'Vandiver', 5, 6),
 ('Maddie', 'Hannah', 5, NULL),
 ('Lauren', 'Fick', 4, 9),
 ('Rui', 'Hayashida', 9, NULL),
 ('Danny', 'McCracken', 8, 1),
 ('Andrea', 'Henson', 2, 2),
 ('Jenna', 'McBee', 3, NULL),
 ('Ryan', 'McBee', 6, 4);