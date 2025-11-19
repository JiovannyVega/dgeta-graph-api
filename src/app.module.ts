import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { envSchema } from './config/schema';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { defineConfig, MySqlDriver } from '@mikro-orm/mysql';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { Role } from './modules/roles/entities/role.entity';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig],
      validationSchema: envSchema,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      driver: MySqlDriver,
      useFactory: async (configService: ConfigService) => {
        const db = configService.get('database') as {
          host?: string;
          port?: number;
          user?: string;
          password?: string;
          dbName?: string;
        };

        return defineConfig({
          host: db?.host ?? 'localhost',
          port: db?.port ?? 3306,
          user: db?.user,
          password: db?.password,
          dbName: db?.dbName,
          // provide entity classes explicitly so discovery works under ts-node
          entities: [Role, User],
          allowGlobalContext: true,
          debug: configService.get('NODE_ENV') !== 'production',
        } as any);
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({ req, res, session: req.session }),
    }),
    RolesModule,
    UsersModule,
  ],
})
export class AppModule { }
