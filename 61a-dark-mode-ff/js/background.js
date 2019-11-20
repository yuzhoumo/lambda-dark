let currentTab;
let disable = false;

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
    
    chrome.tabs.reload(currentTab.tabId, {});
};

browser.browserAction.onClicked.addListener( (tab) => {
    currentTab = tab;
    browser.browserAction.getTitle({}, toggleExtension);
});

const connected = (csPort) => {
    csPort.onMessage.addListener( (message) => {
        console.log("[61A Dark Mode]: Background script received message from content script");
    });
    csPort.postMessage({disabled: disable});
    console.log("[61A Dark Mode]: Background script responded to message from content script");
}

browser.runtime.onConnect.addListener(connected);
