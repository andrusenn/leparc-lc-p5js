
Lp5locale = require('i18next')
var lang_msg = {}
Lp5locale.init({
      lng: 'en',
      debug: true,
      resources: {
            en: {
                  translation: {
                        "LOCAL": "LOCAL",
                        "SERVER": "SERVER",
                        "CLIENT": "CLIENT",
                        "BLOCK NAMES": "BLOCK NAMES",
                        "MODE (net)": "MODE (net)",
                        "NAME (net)": "NAME (net)",
                        "Saved!": "Saved!",
                        "LANG": "LANG",
                        'can not be defined in this block': 'can not be defined in this block',
                        'No more fun?': 'No more fun?',
                        'Snippet loaded -> ': 'Snippet loaded -> ',
                        'Error on load -> ': 'Error on load -> ',
                        "PANNELS": "PANNELS",
                        "VERTICAL": "VERTICAL",
                        "HORIZONTAL": "HORIZONTAL"
                  }
            },
            es: {
                  translation: {
                        "LOCAL": "LOCAL",
                        "SERVER": "SERVIDOR",
                        "CLIENT": "CLIENTE",
                        "BLOCK NAMES": "NOMBRE DE BLOQUES",
                        "MODE (net)": "MODO (net)",
                        "NAME (net)": "NOMBRE (net)",
                        "Saved!": "Guardado!",
                        "LANG": "IDIOMA",
                        'can not be defined in this block': 'no puede ser definida en este bloque',
                        'No more fun?': 'Se terminó la diversión?',
                        'Snippet loaded -> ': 'Snippet cargado -> ',
                        'Error on load -> ': 'Error al cargar -> ',
                        "PANNELS": "PANELES",
                        "VERTICAL": "VERTICAL",
                        "HORIZONTAL": "HORIZONTAL"
                  }
            }
      }
}, function (err, t) {
      if (err) console.log(err)
      // initialized and ready to go!      
      Lp5locale.changeLanguage(localStorage.lang)
      document.querySelector('.en-local').innerHTML = Lp5locale.t('LOCAL');
      document.querySelector('.en-mode').innerHTML = Lp5locale.t('MODE (net)');
      document.querySelector('.en-server').innerHTML = Lp5locale.t('SERVER');
      document.querySelector('.en-client').innerHTML = Lp5locale.t('CLIENT');
      document.querySelector('.en-name').innerHTML = Lp5locale.t('NAME (net)');
      document.querySelector('.en-lang').innerHTML = Lp5locale.t('LANG');
      document.querySelector('.en-title').innerHTML = Lp5locale.t('BLOCK NAMES');
      document.querySelector('.en-pannels').innerHTML = Lp5locale.t('PANNELS');
      document.querySelector('.en-pannels-vert').innerHTML = Lp5locale.t('VERTICAL');
      document.querySelector('.en-pannels-horiz').innerHTML = Lp5locale.t('HORIZONTAL');
      // Mensajes / Messages
      lang_msg.saved = Lp5locale.t('Saved!')
      lang_msg.priv_words = Lp5locale.t('can not be defined in this block')
      lang_msg.exit_app = Lp5locale.t('No more fun?')
      lang_msg.snip = Lp5locale.t('Snippet loaded -> ')
      lang_msg.snip_err = Lp5locale.t('Error on load -> ')
});