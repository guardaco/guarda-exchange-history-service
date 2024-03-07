import { registerAs } from '@nestjs/config';
import { ConfigKeys } from '../config.keys';

export default registerAs(ConfigKeys.EXCHANGE_VENDORS, async () => ({
  changenow: {
    apiUrl: process.env.CHANGENOW_API_URL,
    apiKey: process.env.CHANGENOW_API_KEY,
    apiSecretKey: process.env.CHANGENOW_API_SECRET_KEY || '',
    apiKeyLowFee: process.env.CHANGENOW_API_LOW_FEE_KEY || '',
    isEnable: process.env.CHANGENOW_ENABLE === 'TRUE',
  },
  swapzone: {
    apiUrl: process.env.SWAPZONE_API_URL,
    apiKey: process.env.SWAPZONE_API_KEY,
    isEnable: process.env.SWAPZONE_ENABLE === 'TRUE',
  },
}));
