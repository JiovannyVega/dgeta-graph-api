import * as Joi from 'joi';

// Centralized env schema for validation — reuse in ConfigModule.forRoot
export const envSchema = Joi.object({
  PORT: Joi.number().optional(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').optional(),
  CORS_ALLOWED_ORIGINS: Joi.string().optional(),
  JWT_SECRET: Joi.string().min(8).required(),
  JWT_REFRESH_SECRET: Joi.string().min(8).required(),
  JWT_EXPIRES_IN: Joi.string().optional(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().optional(),
  DB_HOST: Joi.string().hostname().optional(),
  DB_PORT: Joi.number().optional(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow('').required(),
  DB_NAME: Joi.string().required(),
});
