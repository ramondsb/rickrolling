function isRickURL(url) {
  // TODO: Search for top 5 most popular Rick videos on Youtube.
  const rickUrls = ['dQw4w9WgXcQ', 'oHg5SJYRHA0'];

  return rickUrls.some((rickUrl) => url.includes(rickUrl));
}

function markLink(link) {
  // Create span element
  const span = document.createElement('span');
  // TODO: Move CSS styling to own file.
  const spanStyle = 'border-radius: 10px; background-color: red;color: white;text-align: center;position: absolute;font-size: 10px; width: 15px;height: 15px;line-height:15px';
  span.setAttribute('style', spanStyle);
  // TODO: Add identifier to the added element for posterior remotion when inactivate extension
  const spanText = document.createTextNode('!');
  span.appendChild(spanText);

  // Append span to a link
  link.appendChild(span);
}

function checkAndMark(links) {
  // TODO: Need verification when links is empty?
  links.forEach((link) => {
    if (isRickURL(link.href)) {
      // Mark element
      markLink(link);
    }
  });
}

function markLinks() {
  // TODO: Make document a function parameter
  // find link elements
  const { links } = document;
  checkAndMark(Array.from(links));
}

function setMutationObserver() {
  // TODO: Make document a function parameter
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      for (let i = 0; i < mutation.addedNodes.length; i += 1) {
        const node = mutation.addedNodes[i];
        if (node && node.nodeType === Node.ELEMENT_NODE) {
          const aList = node.querySelectorAll('a');
          if (aList.length > 0) {
            checkAndMark(Array.from(aList));
          }
        }
      }
    });
  });

  // TODO: Check all options I need to use in config
  observer.observe(document, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

function onLoadPage() {
  markLinks();
  setMutationObserver();
}

onLoadPage();
