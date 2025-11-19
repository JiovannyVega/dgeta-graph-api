import * as Joi from 'joi';

// Centralized env schema for validation — reuse in ConfigModule.forRoot
export const envSchema = Joi.object({
  PORT: Joi.number().optional(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').optional(),
  CORS_ALLOWED_ORIGINS: Joi.string().optional(),
  SESSION_SECRET: Joi.string().min(8).required(),
});
