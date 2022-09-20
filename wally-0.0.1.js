console.log('Wally Script Loaded')
// Track window location change event
var oldHref = document.location.href;
window.onload = function() {
    var bodyList = document.querySelector("body")
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (oldHref != document.location.href) {
                oldHref = document.location.href;
                removeScriptElement()
                generateScriptElement()
            }
        });
    });
    
    var config = {
        childList: true,
        subtree: true
    };
    
    observer.observe(bodyList, config);
};

// Remove Previous script using Id
function removeScriptElement() {
    var elem = document.getElementById("wallyScript")
    if(elem) elem.remove()
}

// Add script tag with cdn url in website
function generateScriptElement() {
    let params = (new URL(document.location)).searchParams;
    let name = params.get("serveWallyScript");
    if(!name) {
        var head = document.getElementsByTagName('head')[0];
        script = document.createElement('script');
        var wally = document?.currentScript?.dataset?.wally;
        if(wally) wally = JSON.stringify(wally)
        script.src = "https://wally-dev0-cdn.wallyax.com?ref=" + document.location.href + "&token=" + wally;
        script.type = "text/javascript";
        script.id = "wallyScript";
        head.appendChild(script);
    } else {
        console.log('Dont serve JS')
    }
}

// Attach Script when the website is loaded first time
generateScriptElement()
