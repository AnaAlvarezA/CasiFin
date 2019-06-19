USE iservices;

DELIMITER $$
USE `iservices`$$

CREATE PROCEDURE `usersAddOrEdit`
(
  IN _name VARCHAR
(45),
  IN _email INT
)
BEGIN
  IF _iduser = 0 THEN
  INSERT INTO users
    (name, email)
  VALUES
    (_name, _email);

  SET _iduser
  = LAST_INSERT_ID
  ();
ELSE
UPDATE users
    SET
    name = _name,
    email = _email
    WHERE iduser = _iduser;
END
IF;

  SELECT _iduser AS 'iduser';
END
