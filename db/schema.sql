DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS jobRole;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    -- name
);

CREATE TABLE jobRole (
    id INTEGER PRIMARY KEY,
    -- title
    --  salary
    -- department_id
);

CREATE TABLE employee (
   id INTEGER PRIMARY KEY,
    -- first_name
    -- last_name
    -- role_id
    -- manager_id
);