chrome.runtime.onInstalled.addListener(details => {
  if(details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.storage.sync.set({ "show-scrollbar": false });
  }
});
chrome.webNavigation.onCommitted.addListener(loadScriptAndCss, {
    url: [
        { urlPrefix: 'https://www.youtube.com/watch' },
        { urlPrefix: 'https://www.youtube.com/shorts' },
        { urlPrefix: 'https://www.youtube.com/live' },
    ]
});
chrome.webNavigation.onHistoryStateUpdated.addListener(loadScriptAndCss, {
    url: [
        { urlPrefix: 'https://www.youtube.com/watch' },
        { urlPrefix: 'https://www.youtube.com/shorts' },
        { urlPrefix: 'https://www.youtube.com/live' },
    ]
});

function loadScriptAndCss(tab) {
    chrome.scripting.executeScript({target: {tabId: tab.tabId}, files: ["showYoutubeComments.js"]});
    chrome.scripting.insertCSS({target: {tabId: tab.tabId}, files: ["showYoutubeComments.css"]});
    chrome.storage.sync.get(['show-scrollbar'], value => {
            chrome.scripting.insertCSS({target: {tabId: tab.tabId}, files: ["showYoutubeComments-scrollbar.css"]});
    })
}

chrome.commands.onCommand.addListener((cmd) => {
	if ( cmd === "show-scrollbar") {
		chrome.storage.sync.get(['show-scrollbar'] , value => {
			const curr = value['show-scrollbar'] || false;
			chrome.storage.sync.set({'show-scrollbar' : !curr});
		})
	}
})
