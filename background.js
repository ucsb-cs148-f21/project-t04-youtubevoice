chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId,current_tab_info =>{
        if(/^https:\/\/www\.youtube/.test(current_tab_info.url)){
            chrome.tabs.executeScript(null,{file: './foreground.js'},() => console.log('This is a Youtube page'))
        }
    });
});