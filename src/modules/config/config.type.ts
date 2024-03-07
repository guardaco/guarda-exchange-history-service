export interface AppConfig {
  port: number;
}

export interface ChangeNowApiOptions {
  apiUrl: string;
  apiKey: string;
  apiSecretKey: string;
  apiKeyLowFee: string;
  isEnable: boolean;
}

export interface SwapzoneApiOptions {
  apiUrl: string;
  apiKey: string;
  isEnable: boolean;
}

export interface ExchangeVendorsConfig {
  changenow: ChangeNowApiOptions;
  swapzone: SwapzoneApiOptions;
}
