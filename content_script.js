function isRickURL(url) {
    // TODO: Implement function
    return true;
}

function markElement(element) {
    // Create span element
    var span = document.createElement('span');
    var spanStyle = 'border-radius: 10px; background-color: red;color: white;text-align: center;position: absolute;font-size: 10px; width: 15px;height: 15px;line-height:15px';
    span.setAttribute('style', spanStyle);
    var spanText = document.createTextNode('!');
    span.appendChild(spanText);

    // Append span to a link
    element.appendChild(span);
}

function markLinks() {
    // find link elements
    var hrefs = [];
    var links = document.links;

    // TODO: Need verification when links is empty?
    for (var link of links) {
        if (isRickURL(link.href)) {
            // Mark element
            markElement(link);
        }
    }
}

markLinks();
