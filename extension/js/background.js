// Allows Chromium & Firefox extensions to use the same codebase
const global =
  'undefined' !== typeof chrome ||
  ('undefined' !== window.opr && 'undefined' !== opr.addons)
    ? chrome // Chromium
    : 'undefined' !== InstallTrigger
    ? browser // Firefox
    : void 0;

let currentTab;
let disable = false;

// Sets title & badge text, toggles dark mode (on/off)
const toggleExtension = (title) => { 
    if (title == "CS61B Dark Mode (Enabled)") {
        global.browserAction.setTitle({title: "CS61B Dark Mode (Disabled)"});
        disable = true;
        global.browserAction.setBadgeText({text: "OFF"});
        console.log('[CS61B Dark Mode]: Disabled');
    } else {
        global.browserAction.setTitle({title: "CS61B Dark Mode (Enabled)"});
        disable = false;
        global.browserAction.setBadgeText({text: ""});
        console.log('[CS61B Dark Mode]: Enabled');
    }
    
    global.tabs.reload(currentTab.tabId, {});
};

// Toggles extension when icon is clicked
global.browserAction.onClicked.addListener( (tab) => {
    currentTab = tab;
    global.browserAction.getTitle({}, toggleExtension);
});

// Sends boolean (if dark mode is on/off) to content script
const connected = (csPort) => {
    csPort.onMessage.addListener( (message) => {
        console.log("[CS61B Dark Mode]: Background script received message from content script");
    });
    csPort.postMessage({disabled: disable});
    console.log("[CS61B Dark Mode]: Background script responded to message from content script");
}

global.runtime.onConnect.addListener(connected);
