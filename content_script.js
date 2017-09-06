function isRickURL(url) {
    // TODO: Implement function
    return true;
}

function markElement(element) {
    // TODO: Experimental modification of element
    element.innerHTML = "Test";
}

function markLinks() {
    // find link elements
    var hrefs = [];
    var links = document.links;

    // TODO: Need verification when links is empty?
    for (var link of links) {
        if (isRickURL(link.href)) {
            // Mark element
            console.log(link);
            markElement(link);
        }
    }
}

markLinks();
