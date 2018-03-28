import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppConfig } from './app/app.config';

import { AppModule } from './app/app.module';


if (AppConfig.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
