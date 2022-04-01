let element
let lastTextValue
let autoSearch = document.getElementById("autosearch");

let observer = new MutationObserver(mutations => {
    element = document.getElementsByClassName("sia-question-stem")[0];
    try {
        console.log(element.innerText)
        if (element.innerText != lastTextValue) {
            lastTextValue = element.innerText

            // Check if autosearch is enabled
            chrome.storage.sync.get("autosearch", function(state) {
                if (!chrome.runtime.error) {
                  console.log(state);
                  if (Boolean(state.autosearch)) {
                    console.log("enabled")
                    window.open("https://brainly.com/app/ask?q=" + element.innerText)
                  }
                }
              })

        }
        else {}
        
    }
    catch (exception_var) {
        console.log("Empty Question Value")
    }
 });
 observer.observe(document, { childList: true, subtree: true });