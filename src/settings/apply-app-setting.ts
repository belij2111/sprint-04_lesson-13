import { INestApplication } from '@nestjs/common';

const APP_PREFIX = '/api';

export const applyAppSetting = (app: INestApplication) => {
  setAppPrefix(app);
};

const setAppPrefix = (app: INestApplication) => {
  app.setGlobalPrefix(APP_PREFIX);
};