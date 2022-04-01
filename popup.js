let searchbtn = document.getElementById("search");
let autoSearch = document.getElementById("autosearch");

window.onload = function() {
  console.log("Autoload?")
  chrome.storage.sync.get("autosearch", function(state) {
    if (!chrome.runtime.error) {
      console.log(state);
      document.getElementById("autosearch").checked = Boolean(state.autosearch);
    }
  });
}

// When the button is clicked, inject setPageBackgroundColor into current page
searchbtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: searchButtonExec,
  });
});

autoSearch.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleAutosearch(document.getElementById("autosearch").checked),
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function searchButtonExec() {
  console.log(element.innerText)
  window.open("https://brainly.com/app/ask?q=" + element.innerText)
}

function toggleAutosearch(state) {
  console.log("autosearch updated")

  chrome.storage.sync.set({ "autosearch" : state }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
}
