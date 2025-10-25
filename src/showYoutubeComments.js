//init 
checkShowScrollbarAndCmd();

function showCommentsOnTheRight() {
	if (!comments() || !watchNext()) {
		window.setTimeout(showCommentsOnTheRight, 500);
		return;
	}
	swapCommentsAndWatchNext();
}

function swapCommentsAndWatchNext() {
	if (!panelsContainNodes()) {
		return;
	}
	let commentsNode = leftPanel().removeChild(comments());
	let watchNextNode = rightPanel().removeChild(watchNext());
	leftPanel().appendChild(watchNextNode);
	rightPanel().appendChild(commentsNode);
}

function comments() {
	return document.getElementById('comments');
}

function watchNext() {
	return document.getElementById('related');
}

function panelsContainNodes() {
	return leftPanel().contains(comments()) && rightPanel().contains(watchNext());
}

function panelsContainNodesReverst() {
	return leftPanel().contains(watchNext()) && rightPanel().contains(comments());
}

function rightPanel() {
	return document.getElementById('secondary-inner');
}

function leftPanel() {
	return document.querySelector('#primary-inner > #below');
}

function checkShowScrollbarAndCmd() {
	chrome.storage.sync.get(['show-scrollbar'], value => {
		if (value['show-scrollbar'] == true) {
			showCommentsOnTheRight();	
		}
		else {
			resetLayout();
		}
	})
}
function resetLayout() {
	if (!comments() || !watchNext()) {
		window.setTimeout(resetLayout, 500);
		return;
	}
	if (!panelsContainNodesReverst()) {
		return;
	}
	let commentsNode = rightPanel().removeChild(comments());
	let watchNextNode = leftPanel().removeChild(watchNext());
	leftPanel().appendChild(commentsNode);
	rightPanel().appendChild(watchNextNode);
}


chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes['show-scrollbar']) {
    if (changes['show-scrollbar'].newValue) {
      showCommentsOnTheRight();
    } else {
		resetLayout();
    }
  }
});

