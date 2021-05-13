INSERT INTO department (name)
VALUES
    ('Sales'), -- 1
    ('Admin'), -- 2
    ('Accounting'), -- 3
    ('Art'), -- 4
    ('IT'), -- 5
    ('Shipping'); -- 6

INSERT INTO role (title,salary,department_id)
VALUES
    ('Sales Manager', 50000, 1), -- 1
    ('Sales Rep', 40000, 1), -- 2
    ('National Sales Rep', 80000, 1), -- 3
    ('Order Entry', 30000, 2), -- 4
    ('Order Verification', 30000, 2), -- 5
    ('Admin Manager', 40000, 2), -- 6
    ('Collections', 30000, 3), -- 7
    ('Accounts Payable', 30000, 3), -- 8
    ('Accounting Manager', 50000, 3), -- 9
    ('Graphic Artist', 40000, 4), -- 10
    ('Shipping Manager', 50000, 6), -- 11
    ('Warehouse Worker', 30000, 6), -- 12
    ('Systems Administrator', 60000, 5); -- 13

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Taylor', 'Gentry', 1, NULL), -- 1
    ('Kelsey', 'Collins', 6, NULL), -- 2
    ('Connor', 'Vandiver', 9, NULL), -- 3
    ('Maddie', 'Vandiver', 11, NULL), -- 4
    ('Lauren', 'Fick', 2, 1), -- 5
    ('Rui', 'Hayashida', 2, 1), -- 6
    ('Andrea', 'Henson', 3, 1), -- 7
    ('Ryan', 'McBee', 5, 6), -- 8
    ('Jenna', 'McBee', 4, 6), -- 9
    ('Brittney', 'Alford', 4, 6), -- 10
    ('Jack', 'Weiss', 8, 9), -- 11
    ('Sarah', 'Weiss', 7, 9), -- 12
    ('Vivian', 'Hall', 10, 1), -- 13
    ('Andre', 'Rabideau', 12, 11), -- 14
    ('Danny', 'McCraken', 12, 11), -- 15
    ('Nick', 'Jones', 13, 1); -- 16