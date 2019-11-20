let currentTab;
let disable = false;

const toggleExtension = (title) => { 
    if (title == "cs61a.org Dark Mode (Enabled)") {
        chrome.browserAction.setTitle({title: "cs61a.org Dark Mode (Disabled)"});
        disable = true;
        chrome.browserAction.setBadgeText({text: "OFF"});
        console.log('[61A Dark Mode]: Disabled');
    } else {
        chrome.browserAction.setTitle({title: "cs61a.org Dark Mode (Enabled)"});
        disable = false;
        chrome.browserAction.setBadgeText({text: ""});
        console.log('[61A Dark Mode]: Enabled');
    }
    
    chrome.tabs.reload(currentTab.tabId, {});
};

chrome.browserAction.onClicked.addListener( (tab) => {
    currentTab = tab;
    chrome.browserAction.getTitle({}, toggleExtension);
});

const connected = (csPort) => {
    csPort.onMessage.addListener( (message) => {
        console.log("[61A Dark Mode]: Background script received message from content script");
    });
    csPort.postMessage({disabled: disable});
    console.log("[61A Dark Mode]: Background script responded to message from content script");
}

chrome.runtime.onConnect.addListener(connected);
