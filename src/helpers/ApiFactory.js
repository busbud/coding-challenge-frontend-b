require('es6-promise').polyfill();

const ApiCall = (url, configuration, currentLanguage) =>
  new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Accept-Language', currentLanguage);

    if (configuration) {
      for (const newHeader in configuration.headers) {
        headers.set(newHeader, configuration.headers[newHeader]);
      }
    }

    const finalConfig = {
      method: 'get',
      ...configuration,
      headers,
    };

    if (configuration && configuration.json !== null && configuration.json !== undefined) {
      Object.assign(finalConfig, { body: JSON.stringify(configuration.json) });
    }

    return fetch(url, finalConfig).then((response) => {
      const contentType = response.headers.get('content-type');

      if (response.status === 200 || response.status === 201) {
        return response.json().then((result) => {
          resolve(result);
        });
      } else if (contentType && contentType.includes('application/json')) {
        return response.json(err => reject(err));
      }
      reject(new Error(response.status.text));
    });
  });

// TODO; replace "en-en" by the current locale when implementing i18n

export const Api = (url, configuration, currentLanguage = 'en-en') =>
  ApiCall(url, configuration, currentLanguage);
