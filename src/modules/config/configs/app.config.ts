import { registerAs } from '@nestjs/config';
import { ConfigKeys } from '../config.keys';

export default registerAs(ConfigKeys.APP, () => ({
  port: +Number(process.env.PORT),
}));
