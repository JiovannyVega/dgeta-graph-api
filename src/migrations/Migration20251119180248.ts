import { Migration } from '@mikro-orm/migrations';

export class Migration20251119180248 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`refresh_tokens\` (\`id\` int unsigned not null auto_increment primary key, \`token\` text not null, \`user_user_id\` int unsigned not null, \`created_at\` datetime not null, \`expires_at\` datetime null, \`revoked\` tinyint(1) not null default false) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`refresh_tokens\` add unique \`refresh_tokens_token_unique\`(\`token\`);`);
    this.addSql(`alter table \`refresh_tokens\` add index \`refresh_tokens_user_user_id_index\`(\`user_user_id\`);`);

    this.addSql(`alter table \`refresh_tokens\` add constraint \`refresh_tokens_user_user_id_foreign\` foreign key (\`user_user_id\`) references \`users\` (\`user_id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`refresh_tokens\`;`);
  }

}
