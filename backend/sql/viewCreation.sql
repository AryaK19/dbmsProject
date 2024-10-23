CREATE VIEW hackathon_participants_view AS
SELECT u.id, u.name, r.hackathon_id
FROM users u
JOIN registrations r ON u.id = r.user_id;