
Lp5locale = require('i18next')
var lang_msg = {}
Lp5locale.init({
      lng: 'en',
      debug: true,
      resources: {
            es: {
                  translation: {
                        "LOCAL": "LOCAL",
                        "SERVER": "SERVIDOR",
                        "CLIENT": "CLIENTE",
                        "MODE (net)": "MODO (net)",
                        "NAME (net)": "NOMBRE (net)",
                        "Saved!":"Guardado!",
                        "LANG":"IDIOMA",
                        'can not be used':'no puede ser utilizada en este bloque'
                  }
            }
      }
}, function (err, t) {
      // initialized and ready to go!      
      Lp5locale.changeLanguage(localStorage.lang)
      document.querySelector('.en-local').innerHTML = Lp5locale.t('LOCAL');
      document.querySelector('.en-mode').innerHTML = Lp5locale.t('MODE (net)');
      document.querySelector('.en-server').innerHTML = Lp5locale.t('SERVER');
      document.querySelector('.en-client').innerHTML = Lp5locale.t('CLIENT');
      document.querySelector('.en-name').innerHTML = Lp5locale.t('NAME (net)');
      document.querySelector('.en-lang').innerHTML = Lp5locale.t('LANG');
      // Mensajes / Messages
      lang_msg.saved = Lp5locale.t('Saved!')
      lang_msg.priv_words = Lp5locale.t('can not be used')
});