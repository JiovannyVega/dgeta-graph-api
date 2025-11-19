import { Migration } from '@mikro-orm/migrations';

export class Migration20251119163401 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`roles\` (\`role_id\` int unsigned not null auto_increment primary key, \`role_name\` varchar(255) not null, \`description\` text null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`roles\` add unique \`roles_role_name_unique\`(\`role_name\`);`);

    this.addSql(`create table \`users\` (\`user_id\` int unsigned not null auto_increment primary key, \`role_role_id\` int unsigned not null, \`username\` varchar(255) not null, \`password_hash\` varchar(255) not null, \`email\` varchar(255) not null, \`registered_at\` datetime null, \`last_login\` datetime null, \`active\` tinyint(1) not null default true) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`users\` add index \`users_role_role_id_index\`(\`role_role_id\`);`);
    this.addSql(`alter table \`users\` add unique \`users_username_unique\`(\`username\`);`);
    this.addSql(`alter table \`users\` add unique \`users_email_unique\`(\`email\`);`);

    this.addSql(`alter table \`users\` add constraint \`users_role_role_id_foreign\` foreign key (\`role_role_id\`) references \`roles\` (\`role_id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`users\` drop foreign key \`users_role_role_id_foreign\`;`);

    this.addSql(`drop table if exists \`roles\`;`);

    this.addSql(`drop table if exists \`users\`;`);
  }

}
