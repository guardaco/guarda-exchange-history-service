import { registerAs } from '@nestjs/config';
import { ConfigKeys } from '../config.keys';

export default registerAs(ConfigKeys.MONGODB, () => ({
  type: 'mongodb',
  url: `mongodb://${process.env.MONGO_PATH}`,
  useNewUrlParser: true,
  logging: true,
  autoLoadEntities: true,
  useUnifiedTopology: true,
  name: `connect-${Math.random()}`,
}));
