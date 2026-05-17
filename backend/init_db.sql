
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    owner VARCHAR(50),
    content TEXT
);

CREATE TABLE IF NOT EXISTS searchable_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    role VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS secret_flags (
    id SERIAL PRIMARY KEY,
    flag TEXT
);

INSERT INTO notes (id, owner, content) VALUES
(1, 'admin', 'CONFIDENTIAL: CTF{1d0r_4cc3ss_c0ntr0l_byp4ss}')
ON CONFLICT (id) DO NOTHING;


SELECT setval('notes_id_seq', 100, false);


INSERT INTO searchable_users (username, role) VALUES
('alice', 'user'),
('bob', 'user'),
('carol', 'user'),
('dave', 'moderator'),
('eve', 'user')
ON CONFLICT DO NOTHING;


INSERT INTO secret_flags (flag) VALUES
('CTF{union_s3l3ct_ftw_sql1_m4st3r}')
ON CONFLICT DO NOTHING;


DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'ctf_readonly') THEN
        CREATE ROLE ctf_readonly WITH LOGIN PASSWORD 'readonly_pass';
    END IF;
END
$$;

GRANT CONNECT ON DATABASE ctfdb TO ctf_readonly;
GRANT USAGE ON SCHEMA public TO ctf_readonly;
GRANT SELECT ON notes, searchable_users, secret_flags TO ctf_readonly;



