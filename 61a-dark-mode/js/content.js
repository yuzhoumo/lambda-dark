// Allows Chrome, Firefox, & Opera extension to use the same codebase
const global =
  'undefined' !== typeof chrome ||
  ('undefined' !== window.opr && 'undefined' !== opr.addons)
    ? chrome // Chrome or Opera
    : 'undefined' !== InstallTrigger
    ? browser // Firefox
    : void 0;

let port = global.runtime.connect({name:"cs-port"});

// Applies dark mode CSS if extension is enabled
const injectCSS = (disabled) => {
    if (!disabled) {
        var head = document.head;
        var link = document.createElement("link");

        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = chrome.extension.getURL("css/override.css");

        head.appendChild(link);

        console.log("[61A Dark Mode]: Enabled");
    } else {
        console.log("[61A Dark Mode]: Disabled");
    }
}

// Request boolean (on/off) from background script
port.postMessage({});

// Receives response to request and runs injectCSS
port.onMessage.addListener( (message) => {
    injectCSS(message.disabled);
});
