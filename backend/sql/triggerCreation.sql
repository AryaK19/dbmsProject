DELIMITER //

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
  DECLARE dob_exists INT;
  
  SELECT COUNT(*) INTO dob_exists FROM user_dob WHERE DOB = NEW.DOB;
  
  IF dob_exists = 0 THEN
    INSERT INTO user_dob (DOB, age) VALUES (NEW.DOB, calculate_age(NEW.DOB));
  END IF;
END //

DELIMITER ;