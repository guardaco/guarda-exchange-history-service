import { registerAs } from '@nestjs/config';
import { ConfigKeys } from '../config.keys';

export default registerAs(ConfigKeys.POSTGRES, () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, 
}));
