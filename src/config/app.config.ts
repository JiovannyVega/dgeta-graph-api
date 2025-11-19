import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: Number(process.env.PORT) || 4002,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: process.env.CORS_ALLOWED_ORIGINS ?? '*',
  sessionSecret: process.env.SESSION_SECRET,
}));
