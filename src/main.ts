import 'hammerjs';
import { enableProdMode, MissingTranslationStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@env';
import { getTranslationProviders } from './i18.providers';

if (environment.production) {
  enableProdMode();
}

const providers = getTranslationProviders();

platformBrowserDynamic().bootstrapModule(AppModule, {
  missingTranslation: MissingTranslationStrategy.Error,
  providers
})
.catch(err => console.error(err));
