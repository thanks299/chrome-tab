document.addEventListener('DOMContentLoaded', () => {
    const tabsList = document.getElementById('tabsList');
    const saveTabsButton = document.getElementById('saveTabs');
    const closeAllTabsButton = document.getElementById('closeAllTabs');
  
    // List all open tabs
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        let li = document.createElement('li');
        li.textContent = tab.title;
        tabsList.appendChild(li);
      });
    });

    // Function to display saved tabs
    function displaySavedTabs() {
        chrome.storage.local.get('savedTabs', (data) => {
            const savedTabsList = document.getElementById('saved-tabs-list');
            savedTabsList.innerHTML = ''; // Clear previous list
            
            // Check if saved tabs exist
            if (data.savedTabs) {
                data.savedTabs.forEach(url => {
                    const listItem = document.createElement('li');
                    listItem.textContent = url;
                    savedTabsList.appendChild(listItem);
                });
            } else {
                savedTabsList.innerHTML = '<li>No saved tabs</li>';
            }
        });
    }

    // Call the function to display saved tabs when the popup is opened
    document.addEventListener('DOMContentLoaded', displaySavedTabs);

    // Save tabs for later
    saveTabsButton.addEventListener('click', () => {
      chrome.tabs.query({}, (tabs) => {
        const tabUrls = tabs.map(tab => tab.url);
        chrome.storage.sync.set({ savedTabs: tabUrls }, () => {
          alert('Tabs saved!');
        });
      });
    });
  
    // Close all open tabs
    closeAllTabsButton.addEventListener('click', () => {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => chrome.tabs.remove(tab.id));
      });
    });
  });
  