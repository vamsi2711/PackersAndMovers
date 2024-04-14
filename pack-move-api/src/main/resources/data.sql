INSERT INTO USER_DETAILS
VALUES (UUID(), 'user@gmail.com', 'User', 'user@123', 1231231, 'User');
INSERT INTO USER_DETAILS
VALUES (UUID(), 'agent@gmail.com', 'Agent', 'agent@123', 1231231, 'Agent');
INSERT INTO USER_DETAILS
VALUES (UUID(), 'admin@gmail.com', 'Admin', 'admin@123', 1231231, 'Admin');
INSERT INTO USER_DETAILS
VALUES (UUID(), 'u', 'U', 'u', 1231231, 'User');
INSERT INTO USER_DETAILS
VALUES (UUID(), 'p', 'P', 'p', 1231231, 'Agent');
INSERT INTO USER_DETAILS
VALUES (UUID(), 'pp', 'Agent1', 'pp', 1231231, 'Agent');
INSERT INTO USER_DETAILS
VALUES (UUID(), 'ppp', 'Agent2', 'ppp', 1231231, 'Agent');
INSERT INTO USER_DETAILS
VALUES (UUID(), 'a', 'A', 'a', 1231231, 'Admin');

INSERT INTO SERVICE_TYPES
VALUES (UUID(), TRUE, 'Vehicle Shifting');
INSERT INTO SERVICE_TYPES
VALUES (UUID(), TRUE, 'House Shifting');
INSERT INTO SERVICE_TYPES
VALUES (UUID(), TRUE, 'Corporate Shifting');
INSERT INTO SERVICE_TYPES
VALUES (UUID(), TRUE, 'Packing');
INSERT INTO SERVICE_TYPES
VALUES (UUID(), TRUE, 'Storage Service');

INSERT INTO PACKERS
VALUES (UUID(), 'Houston', 'Des', 'houstonpackers@gmail.com', 'Houston move smart', 12312313, 'Houston',
        (SELECT id FROM USER_DETAILS WHERE email = 'p'));

INSERT INTO PACKERS
VALUES (UUID(), 'Dallas', 'Des', 'dallas@gmail.com', 'Dallas logistics', 98765234, 'CA',
        (SELECT id FROM USER_DETAILS WHERE email = 'pp'));
INSERT INTO PACKERS
VALUES (UUID(), 'Springfield', 'Des', 'springfield@gmail.com', 'Springfield Movers', 19289382, 'IL',
        (SELECT id FROM USER_DETAILS WHERE email = 'agent@gmail.com'));
INSERT INTO PACKERS
VALUES (UUID(), 'Boston', 'Des', 'Boston@gmail.com', 'Boston Packers', 1231231, 'MA',
        (SELECT id FROM USER_DETAILS WHERE email = 'ppp'));

INSERT INTO PACKER_SERVICE
VALUES ((SELECT id FROM PACKERS WHERE email = 'houstonpackers@gmail.com'),
        (SELECT id FROM SERVICE_TYPES WHERE service_type = 'Vehicle Shifting'));
INSERT INTO PACKER_SERVICE
VALUES ((SELECT id FROM PACKERS WHERE email = 'houstonpackers@gmail.com'),
        (SELECT id FROM SERVICE_TYPES WHERE service_type = 'House Shifting'));
INSERT INTO PACKER_SERVICE
VALUES ((SELECT id FROM PACKERS WHERE email = 'dallas@gmail.com'),
        (SELECT id FROM SERVICE_TYPES WHERE service_type = 'Vehicle Shifting'));
INSERT INTO PACKER_SERVICE
VALUES ((SELECT id FROM PACKERS WHERE email = 'dallas@gmail.com'),
        (SELECT id FROM SERVICE_TYPES WHERE service_type = 'Storage Service'));
INSERT INTO PACKER_SERVICE
VALUES ((SELECT id FROM PACKERS WHERE email = 'dallas@gmail.com'),
        (SELECT id FROM SERVICE_TYPES WHERE service_type = 'House Shifting'));
INSERT INTO PACKER_SERVICE
VALUES ((SELECT id FROM PACKERS WHERE email = 'springfield@gmail.com'),
        (SELECT id FROM SERVICE_TYPES WHERE service_type = 'Packing'));
INSERT INTO PACKER_SERVICE
VALUES ((SELECT id FROM PACKERS WHERE email = 'Boston@gmail.com'),
        (SELECT id FROM SERVICE_TYPES WHERE service_type = 'Corporate Shifting'));
INSERT INTO PACKER_SERVICE
VALUES ((SELECT id FROM PACKERS WHERE email = 'Boston@gmail.com'),
        (SELECT id FROM SERVICE_TYPES WHERE service_type = 'Storage Service'));


INSERT INTO QUOTATION
VALUES (UUID(), '3231', 'comments', '2022-12-10', 'des', 'active',
        (SELECT id FROM PACKERS WHERE email = 'dallas@gmail.com'),
        (SELECT id FROM USER_DETAILS WHERE email = 'user@gmail.com'),
        (SELECT id FROM SERVICE_TYPES WHERE SERVICE_TYPE = 'House Shifting'));
INSERT INTO QUOTATION
VALUES (UUID(), '231', 'comments', '2023-04-10', 'des', 'active',
        (SELECT id FROM PACKERS WHERE email = 'houstonpackers@gmail.com'),
        (SELECT id FROM USER_DETAILS WHERE email = 'user@gmail.com'),
        (SELECT id FROM SERVICE_TYPES WHERE SERVICE_TYPE = 'Vehicle Shifting'));
INSERT INTO QUOTATION
VALUES (UUID(), '31', 'comments', '2022-12-10', 'des', 'active',
        (SELECT id FROM PACKERS WHERE email = 'dallas@gmail.com'),
        (SELECT id FROM USER_DETAILS WHERE email = 'u'),
        (SELECT id FROM SERVICE_TYPES WHERE SERVICE_TYPE = 'Packing'));
INSERT INTO QUOTATION
VALUES (UUID(), '1231', 'comments', '2023-04-10', 'des', 'active',
        (SELECT id FROM PACKERS WHERE email = 'Boston@gmail.com'),
        (SELECT id FROM USER_DETAILS WHERE email = 'u'),
        (SELECT id FROM SERVICE_TYPES WHERE SERVICE_TYPE = 'Corporate Shifting'));
VALUES (UUID(), '1111', 'comments', '2023-04-10', 'des', 'inactive',
        (SELECT id FROM PACKERS WHERE email = 'Boston@gmail.com'),
        (SELECT id FROM USER_DETAILS WHERE email = 'u'),
        (SELECT id FROM SERVICE_TYPES WHERE SERVICE_TYPE = 'Corporate Shifting'));


--Orders
INSERT INTO ORDERS
VALUES (UUID(), '2022-05-12', 'Pending', 'Initiated',
        (SELECT id FROM USER_DETAILS WHERE email = 'user@gmail.com'),
        (SELECT id FROM PACKERS WHERE email = 'houstonpackers@gmail.com'),
        (SELECT id FROM QUOTATION WHERE amount = '3231'));
INSERT INTO ORDERS
VALUES (UUID(), '2022-05-12', 'Pending', 'Canceled',
        (SELECT id FROM USER_DETAILS WHERE email = 'user@gmail.com'),
        (SELECT id FROM PACKERS WHERE email = 'dallas@gmail.com'),
        (SELECT id FROM QUOTATION WHERE amount = '231'));
INSERT INTO ORDERS
VALUES (UUID(), '2022-05-12', 'Pending', 'Completed',
        (SELECT id FROM USER_DETAILS WHERE email = 'u'),
        (SELECT id FROM PACKERS WHERE email = 'dallas@gmail.com'),
        (SELECT id FROM QUOTATION WHERE amount = '31'));
INSERT INTO ORDERS
VALUES (UUID(), '2022-05-12', 'Pending', 'Processing',
        (SELECT id FROM USER_DETAILS WHERE email = 'user@gmail.com'),
        (SELECT id FROM PACKERS WHERE email = 'houstonpackers@gmail.com'),
        (SELECT id FROM QUOTATION WHERE amount = '1231'));
INSERT INTO ORDERS
VALUES (UUID(), '2022-05-12', 'Pending', 'Processing',
        (SELECT id FROM USER_DETAILS WHERE email = 'u'),
        (SELECT id FROM PACKERS WHERE email = 'Boston@gmail.com'),
        (SELECT id FROM QUOTATION WHERE amount = '1111'));

--
-- --Feedback
INSERT INTO FEEDBACK
VALUES (UUID(), '2022-05-12', 'Nice', '4.5',
        (SELECT id FROM PACKERS WHERE email = 'houstonpackers@gmail.com'),
        (SELECT id FROM USER_DETAILS WHERE email = 'user@gmail.com'));
INSERT INTO FEEDBACK
VALUES (UUID(), '2022-05-12', 'Good', '3.5',
        (SELECT id FROM PACKERS WHERE email = 'dallas@gmail.com'),
        (SELECT id FROM USER_DETAILS WHERE email = 'user@gmail.com'));
INSERT INTO FEEDBACK
VALUES (UUID(), '2022-05-12', 'Average', '3',
        (SELECT id FROM PACKERS WHERE email = 'dallas@gmail.com'),
        (SELECT id FROM USER_DETAILS WHERE email = 'u'));
INSERT INTO FEEDBACK
VALUES (UUID(), '2022-05-12', 'Waste service', '2',
        (SELECT id FROM PACKERS WHERE email = 'houstonpackers@gmail.com'),
        (SELECT id FROM USER_DETAILS WHERE email = 'user@gmail.com'));
INSERT INTO FEEDBACK
VALUES (UUID(), '2022-05-12', 'Good', '4',
        (SELECT id FROM PACKERS WHERE email = 'Boston@gmail.com'),
        (SELECT id FROM USER_DETAILS WHERE email = 'u'));



------

-- SELECT * FROM PACKER_SERVICE  where packer_id = '0afcbc64-bf2b-4d98-bb43-eb22365299d0';
--
-- Select * from SERVICE_TYPES where id = '5687284f-afe2-4631-93ad-192ae3537830';