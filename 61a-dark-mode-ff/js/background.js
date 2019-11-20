let currentTab;
let disable = false;

// Sets title & badge text, toggles dark mode (on/off)
const toggleExtension = (title) => { 
    if (title == "cs61a.org Dark Mode (Enabled)") {
        browser.browserAction.setTitle({title: "cs61a.org Dark Mode (Disabled)"});
        disable = true;
        browser.browserAction.setBadgeText({text: "OFF"});
        console.log('[61A Dark Mode]: Disabled');
    } else {
        browser.browserAction.setTitle({title: "cs61a.org Dark Mode (Enabled)"});
        disable = false;
        browser.browserAction.setBadgeText({text: ""});
        console.log('[61A Dark Mode]: Enabled');
    }
    
    browser.tabs.reload(currentTab.tabId, {});
};

// Toggles extension when icon is clicked
browser.browserAction.onClicked.addListener( (tab) => {
    currentTab = tab;
    browser.browserAction.getTitle({}, toggleExtension);
});

// Sends boolean (if dark mode is on/off) to content script
const connected = (csPort) => {
    csPort.onMessage.addListener( (message) => {
        console.log("[61A Dark Mode]: Background script received message from content script");
    });
    csPort.postMessage({disabled: disable});
    console.log("[61A Dark Mode]: Background script responded to message from content script");
}

browser.runtime.onConnect.addListener(connected);
