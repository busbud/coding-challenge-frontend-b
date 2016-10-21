'use strict'

let readFile = require('./readfile.js'),
    config   = require('./config.js'),
    locales  = require('./locales.js'),
    cache    = require('./cache.js'),
  
    pub = {}, 
    pri = {};

pub.getConfig = function getConfig(systemKey) {
  
  systemKey = pub.cleanSystemKey(systemKey);
  
  return new Promise(function(resolve, reject) {
    
    if(cache.exists(systemKey)) {

      resolve(cache.get(systemKey));
      
    } else {

      let resFilePath = config.SYSTEMS_CONFIG_LOCATION + systemKey + "/config.json";
      
      readFile(resFilePath)
        .then(function(data) {
          try {

            let sC = JSON.parse(data);
            
            //Fill in defaults, if they're missing. 
            if(typeof sC.systemKey            === 'undefined') sC.systemKey            = systemKey;
            if(typeof sC.style                === 'undefined') sC.style                = {};
            if(typeof sC.style.background     === 'undefined') sC.style.background     = {};
            if(typeof sC.style.background.src === 'undefined') sC.style.background.src = 'system/res/bkg.jpg';
            if(typeof sC.style.logo           === 'undefined') sC.style.logo           = {};
            if(typeof sC.style.logo.src       === 'undefined') sC.style.logo.src       = 'system/res/logo.png';
            if(typeof sC.video                === 'undefined') sC.video                = {};
            if(typeof sC.video.autoPlay       === 'undefined') sC.video.autoPlay       = false;
            if(typeof sC.video.muted          === 'undefined') sC.video.muted          = false;
            if(typeof sC.video.src            === 'undefined') sC.video.src            = 'system/res/splash.mp4';

            cache.set(systemKey, sC);
            resolve(sC);
            
          } catch(error) {
            console.error(error);
            reject(error);
          }
        })
        .catch(function(error) {
          console.error(error);
          reject(error);
        })
    }
  })
}

pub.getLocalizedConfig = function getConfig(systemKey, acceptLocales) {
  
  return new Promise(function(resolve, reject) {
    
    systemKey = pub.cleanSystemKey(systemKey);
    
    let cacheKey = "getLocalizedConfig"+systemKey+acceptLocales;
    
    if(cache.exists(cacheKey)) {

      resolve(cache.get(cacheKey));

    } else {

      pub
        .getConfig(systemKey, acceptLocales)
        .then(function(systemConfig) {

          locales
            .getLocalizationData(acceptLocales, systemConfig.locales)
            .then(function(localizationData) {
              
              let r = JSON.parse(JSON.stringify(systemConfig));

              if(r.locales) delete r.locales;

              Object.assign(r, localizationData);

              cache.set(cacheKey, r);
              
              resolve(r);
            })

        })
        .catch(function(error) {
          console.error(error);
          res.status(500).json({'ErrorMessage' : `Unable to generate config for ${systemKey}.`, error: error});  
        });

    }
  })
}

//Scrubs the port number off, if one was passed in
pub.cleanSystemKey = function hostToSystemKey(host) {
  return( host.match(/:/g) ) ? host.slice( 0, host.indexOf(":") ) : host
}

pub.isSystemValid = function CheckSystem(systemKey) {

  systemKey = pub.cleanSystemKey(systemKey);
  
  return new Promise(function(resolve, reject) {
    if(cache.exists(systemKey)) {
      resolve(true);
    } else {
      pub
        .getConfig(systemKey)
        .then(function() {
          resolve(true);
        })
        .catch(function() {
          reject(false);
        })
    }
  })
}

module.exports = exports = pub;