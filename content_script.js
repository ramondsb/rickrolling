function isRickURL(url) {
    // TODO: Search for top 5 most popular Rick videos on Youtube.
    var RICK_URLS = ['dQw4w9WgXcQ', 'oHg5SJYRHA0'];

    for(var rick_url of RICK_URLS) {
        if (url.indexOf(rick_url) !== -1) {
            return true;
        }
    }
    return false;
}

function markElement(element) {
    // Create span element
    var span = document.createElement('span');
    // TODO: Move CSS styling to own file.
    var spanStyle = 'border-radius: 10px; background-color: red;color: white;text-align: center;position: absolute;font-size: 10px; width: 15px;height: 15px;line-height:15px';
    span.setAttribute('style', spanStyle);
    // TODO: Add identifier to the added element for posterior remotion when inactivate extension
    var spanText = document.createTextNode('!');
    span.appendChild(spanText);

    // Append span to a link
    element.appendChild(span);
}

function markLinks() {
    // TODO: Make document a function parameter
    // find link elements
    var hrefs = [];
    var links = document.links;
    checkAndMark(links);
}

function checkAndMark(links) {
    // TODO: Need verification when links is empty?
    for (var link of links) {
        if (isRickURL(link.href)) {
            // Mark element
            markElement(link);
        }
    }
}

function setMutationObserver() {
    // TODO: Make document a function parameter
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++)
            var node = mutation.addedNodes[i];
            if (node) {
                var aList = node.querySelectorAll('a');
                if (aList.length > 0) {
                    checkAndMark(aList);
                }
            }
        })
    });

    // TODO: Check all options I need to use in config
    observer.observe(document, { childList: true, subtree: true, characterData: true });
}

function onLoadPage() {
    markLinks();
    setMutationObserver();
}

onLoadPage();
