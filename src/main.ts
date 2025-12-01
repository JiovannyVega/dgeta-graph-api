import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigType } from '@nestjs/config';
import appConfig from './config/app.config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appCfg = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  const port = appCfg.port;
  const rawCors = appCfg.corsOrigins ?? '*';
  const corsOrigins = rawCors === '*' ? true : rawCors.split(',').map((s) => s.trim());

  app.enableCors({ origin: corsOrigins, credentials: true });
  app.use(cookieParser());

  await app.listen(port, '0.0.0.0');
  console.log(`Server listening on http://0.0.0.0:${port}`);
}

bootstrap();
