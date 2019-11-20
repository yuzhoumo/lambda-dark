let port = browser.runtime.connect({name:"cs-port"});

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

port.postMessage({});

port.onMessage.addListener( (message) => {
    injectCSS(message.disabled);
});
