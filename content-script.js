// TODO: Search for top 5 most popular Rick videos on Youtube.
const rickUrls = ['dQw4w9WgXcQ', 'oHg5SJYRHA0'];

function isRickURL(url, rickUrls) {
  return rickUrls.some((rickUrl) => url.includes(rickUrl));
}

function markLink(link) {
  const spanStyle = `
    border-radius: 10px;
    background-color: red;
    color: white;
    text-align: center;
    position: absolute;
    font-size: 10px;
    width: 15px;
    height: 15px;
    line-height:15px`;
  const span = document.createElement('span');
  const spanContent = document.createTextNode('!');

  span.setAttribute('style', spanStyle);
  span.setAttribute('data-rick-link', true);
  span.appendChild(spanContent);

  // Append an exclamation sign next to rickrolling link
  link.appendChild(span);
}

function checkAndMark(links) {
  // TODO: Need verification when links is empty?
  links.forEach((link) => {
    if (isRickURL(link.href, rickUrls)) {
      // Mark element
      markLink(link);
    }
  });
}

function setMutationObserver(element, onMutation) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(onMutation);
  });

  // TODO: Check config options
  observer.observe(element, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

function onLoadPage() {
  function onMutation(mutation) {
    for (let i = 0; i < mutation.addedNodes.length; i += 1) {
      const node = mutation.addedNodes[i];
      if (node && node.nodeType === Node.ELEMENT_NODE) {
        const aList = node.querySelectorAll('a');
        if (aList.length > 0) {
          checkAndMark(Array.from(aList));
        }
      }
    }
  }

  setMutationObserver(document, onMutation);
}

// NOTE: With the option "run_at: document_start" in the manifest.json.
// This js will be load before any DOM modification occurs.
onLoadPage();
