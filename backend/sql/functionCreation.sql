DELIMITER //

CREATE FUNCTION calculate_age(dob_year INT) RETURNS INT
DETERMINISTIC
BEGIN
  DECLARE age INT;
  SET age = YEAR(CURDATE()) - dob_year;
  RETURN age;
END //

DELIMITER ;