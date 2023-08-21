// A list of well known and used Rick Roll Youtube videos. This should be enough to catch most RR cases.
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
  if (links && links.length > 0) {
    links.forEach((link) => {
      if (isRickURL(link.href, rickUrls)) {
        // Mark element
        markLink(link);
      }
    });
  }
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
    const addedNodes = Array
      .from(mutation.addedNodes)
      .filter((n) => n.nodeType === Node.ELEMENT_NODE);
    const addedLinks = addedNodes
      .map((n) => Array.from(n.querySelectorAll('a')))
      .filter((l) => l.length > 0);
    const collectedLinks = addedLinks
      .reduce((acc, links) => acc.concat(links), []);

    checkAndMark(collectedLinks);
  }

  setMutationObserver(document, onMutation);
}

// NOTE: With the option "run_at: document_start" in the manifest.json.
// This js will be load before any DOM modification occurs.
onLoadPage();
