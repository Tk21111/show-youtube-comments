chrome.storage.sync.get(['show-scrollbar'], value => {
  let showOnRight = value['show-scrollbar'] || false;
  const toggleButton = document.getElementById('show-scrollbar');
  toggleButton.checked = showOnRight;

  toggleButton.addEventListener('click', () => {
    showOnRight = !showOnRight;
    chrome.storage.sync.set({ "show-scrollbar": showOnRight });
    toggleButton.checked = showOnRight;
    console.log(`show-scrollbar toggle set to: ${showOnRight}`);
  });
});
