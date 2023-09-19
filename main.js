searchWebArchive = function (word) {
    // Use the URL from the input field as needed.
    const searchBySelection = word.selectionText;
    const searchByHover = word.linkUrl;
    // TODO - make the decision which mode to use based on the content word; e.g. pattern based
    // if hovering over a link - search for that link on webarchive and exit
    if (searchByHover) {
      const newURL = `https://web.archive.org/cdx/search/cdx?url=${searchByHover}&matchType=domain&fl=original&collapse=urlkey&output=text&filter=statuscode:200`;
      // Open the modified URL in a new tab.
      chrome.tabs.create({ url: newURL });
      return;
    }
    // if text is selected - search for that text as a domain name on webarchive
    if (searchBySelection) {
      const newURL = `https://web.archive.org/cdx/search/cdx?url=${searchBySelection}&matchType=domain&fl=original&collapse=urlkey&output=text&filter=statuscode:200`;

      // Open the modified URL in a new tab.
      chrome.tabs.create({ url: newURL });
    }
};

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
     id: "1",
     title: "Search WebArchive",
     contexts:["selection","link"],  // ContextType
    }); })

chrome.contextMenus.onClicked.addListener(searchWebArchive);
