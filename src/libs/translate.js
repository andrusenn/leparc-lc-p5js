Lp5locale = require("i18next");
var lang_msg = {};
Lp5locale.init(
    {
        lng: "en",
        debug: true,
        resources: {
            en: {
                translation: {
                    LOCAL: "LOCAL",
                    SERVER: "SERVER",
                    CLIENT: "CLIENT",
                    "PLAY MODE": "PLAY MODE",
                    "MODE (net)": "MODE (net)",
                    "HIDE CANVAS": "HIDE CANVAS",
                    "NAME (net)": "NAME (net)",
                    "Saved!": "Saved!",
                    LANG: "LANG",
                    "not supoerted in webgl render":
                        "not supoerted in webgl render",
                    "can not be defined in this block":
                        "can not be defined in this block",
                    "No more fun?": "No more fun?",
                    "Snippet loaded -> ": "Snippet loaded -> ",
                    "Library loaded -> ": "Library loaded -> ",
                    "Error on load -> ": "Error on load -> ",
                    "Error on load lib -> ": "Error on load lib -> ",
                    "LINE NUMBERS": "LINE NUMBERS",
                    "CODE HELPER": "CODE HELPER",
                    "Initializing camera": "Initializing camera",
                    "Camera ready": "Camera ready",
                    "can be used on LOCAL or SERVER mode only":
                        "can be used on LOCAL or SERVER mode only",
                    "not declared": "not declared",
                },
            },
            es: {
                translation: {
                    LOCAL: "LOCAL",
                    SERVER: "SERVIDOR",
                    CLIENT: "CLIENTE",
                    "PLAY MODE": "PLAY MODE",
                    "MODE (net)": "MODO (net)",
                    "HIDE CANVAS": "OCULTAR CANVAS",
                    "NAME (net)": "NOMBRE (net)",
                    "Saved!": "Guardado!",
                    LANG: "IDIOMA",
                    "not supoerted in webgl render":
                        "no soportado en webgl render",
                    "can not be defined in this block":
                        "no puede ser definida en este bloque",
                    "No more fun?": "Se terminó la diversión?",
                    "Snippet loaded -> ": "Snippet cargado -> ",
                    "Library loaded -> ": "Libreria cargada -> ",
                    "Error on load -> ": "Error al cargar -> ",
                    "Error on load lib -> ":
                        "Error en la carga de librería -> ",
                    "LINE NUMBERS": "NUMEROS DE LINEA",
                    "CODE HELPER": "AYUDA CODIGO",
                    "Initializing camera": "Inicializando cámara",
                    "Camera ready": "Cámara lista",
                    "can be used on LOCAL or SERVER mode only":
                        "Solo puede conectarse en modo LOCAL o SERVER",
                    "not declared": "no declarado",
                },
            },
        },
    },
    function(err, t) {
        if (err) console.log(err);
        Lp5locale.changeLanguage(localStorage.lang);
        document.querySelector(".en-local").innerHTML = Lp5locale.t("LOCAL");
        document.querySelector(".en-playmode").innerHTML = Lp5locale.t(
            "PLAY MODE",
        );
        document.querySelector(".en-mode").innerHTML = Lp5locale.t(
            "MODE (net)",
        );
        document.querySelector(".en-hidecanvas").innerHTML = Lp5locale.t(
            "HIDE CANVAS",
        );
        document.querySelector(".en-server").innerHTML = Lp5locale.t("SERVER");
        document.querySelector(".en-client").innerHTML = Lp5locale.t("CLIENT");
        document.querySelector(".en-name").innerHTML = Lp5locale.t(
            "NAME (net)",
        );
        document.querySelector(".en-lang").innerHTML = Lp5locale.t("LANG");
        document.querySelector(".en-linenumbers").innerHTML = Lp5locale.t(
            "LINE NUMBERS",
        );
        document.querySelector(".en-codehelper").innerHTML = Lp5locale.t(
            "CODE HELPER",
        );
        // Mensajes / Messages
        lang_msg.saved = Lp5locale.t("Saved!");
        lang_msg.priv_words = Lp5locale.t("can not be defined in this block");
        lang_msg.priv_words_render = Lp5locale.t(
            "not supoerted in webgl render",
        );
        lang_msg.exit_app = Lp5locale.t("No more fun?");
        lang_msg.snip = Lp5locale.t("Snippet loaded -> ");
        lang_msg.snip_err = Lp5locale.t("Error on load -> ");
        lang_msg.lib = Lp5locale.t("Library loaded -> ");
        lang_msg.lib_err = Lp5locale.t("Error on load lib -> ");
        lang_msg.cam_init = Lp5locale.t("Initializing camera");
        lang_msg.cam_loaded = Lp5locale.t("Camera ready");
        lang_msg.local_server_mode = Lp5locale.t(
            "can be used on LOCAL or SERVER mode only",
        );
        lang_msg.not_declared = Lp5locale.t("not declared");
    },
);
