USE employees;

INSERT INTO department (name)
VALUES
 ('Sales'), -- 1
 ('Human Resources'), -- 2
 ('Marketing'), -- 3
 ('IT'), -- 4
 ('Accounting'), -- 5
 ;


INSERT INTO role (title, salary, department_id)
VALUES
 ('Sales Manager', 50000, 1), -- 1
 ('Sales Rep', 40000, 1), -- 2
 ('HR Manager', 85000, 2), -- 3
 ('HR Admin', 50000, 2), -- 4
 ('Marketing Director', 140000, 3), -- 5
 ('Marketing Admin', 65000, 3), -- 6
 ('IT Director', 195000, 4); -- 7
 ('Desktop Support', 100000, 4) -- 8
 ('Accounting Manager', 110000, 5), -- 9
 ('Accountant', 90000, 5), -- 10
 ;


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
 ('Taylor', 'Gentry', 7, NULL), -- 1
 ('Kelsey', 'Collins', 1, NULL), -- 2
 ('Connor', 'Vandiver', 5, 6), -- 3
 ('Maddie', 'Hannah', 5, NULL), -- 4
 ('Lauren', 'Fick', 4, 9), -- 5
 ('Rui', 'Hayashida', 9, NULL), -- 6
 ('Danny', 'McCracken', 8, 1), -- 7
 ('Andrea', 'Henson', 2, 2), -- 8
 ('Jenna', 'McBee', 3, NULL), -- 9
 ('Ryan', 'McBee', 6, 4), -- 10
 ;