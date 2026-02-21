-- Generate hash with: node -e "console.log(require('bcryptjs').hashSync('Admin@123', 10))"
insert into public.admin_users (email, name, password_hash, role)
values (
  'admin@kyanjajuniorschool.edu',
  'System Admin',
  '$2a$10$REPLACE_WITH_BCRYPT_HASH',
  'ADMIN'
)
on conflict (email) do update
set
  name = excluded.name,
  password_hash = excluded.password_hash,
  role = excluded.role,
  updated_at = now();

