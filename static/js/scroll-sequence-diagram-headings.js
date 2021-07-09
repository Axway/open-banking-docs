// Using globals to save time when scrolling...
// Grab all the SVG diagrams
const elements = document.getElementsByTagName("svg");
const drawings = [].slice.call(elements, 0, elements.length);

const resetViewportConstraints = (svg, eventType = 'load') => {
  ["style", "height", "width"].forEach(function (attr) { return svg.removeAttribute(attr) });
  // Ensure the diagram fits horizontally in the current window
  svg.setAttribute("preserveAspectRatio", "xMinYMid meet");

  // Set the viewport to match the size when scaled horizontally
  // The diagram will then resize correctly when zoomed in the browser
  const onLoadDimensions = svg.getBoundingClientRect();
  svg.setAttribute("width", onLoadDimensions.width);
  svg.setAttribute("height", onLoadDimensions.height);
};

const translateHeadings = (svg) => {
  // Get the coordinates of the SVG according to the screen position
  // Invert them, as they will be used to position the headings relative to the matrix
  const coordinates = svg.getScreenCTM().inverse();

  // Get the imaginary box around the SVG that the DOM understands
  const position = svg.getBoundingClientRect();

  // Grab the heading nodes that already been identified
  const headings = svg.getElementsByClassName('heading-element');
  const nodes = [].slice.call(headings, 0, headings.length);

  // If the top of the SVG is great than 0 i.e. scrolled down and the position (which'll be negative) 
  // is less than the total height then translate the headings using the f coordinate from the matrix
  // If not, remove the translation as the headings should just go back to their painted on height
  if (coordinates.f > 0 && Math.abs(position.top) < position.height) {
    nodes.forEach(node => node.setAttribute('transform', `translate(0, ${coordinates.f})`));
  } else {
    nodes.forEach(node => node.removeAttribute("transform"));
  }
};

const findActor = function (node) {
  if (node.tagName === 'path') {
    const occurences = node.getAttribute('d').trim().split(' ')
      .map(i => i.replace(/^[a-zA-Z]+/, '').split(',')[0])
      .reduce((counts, x) => {
        counts[x] = counts[x] ? counts[x] += 1 : 1;
        return counts;
      }, {})

    return Object.keys(occurences)
      .reduce((hit, key) => {
        // This means the pencil has been back to the same
        // x coordinate 4 times, to draw the groin of the actor
        if (occurences[key] === 4) return true;
        return hit;
      }, false);
  }

  return false;
}

window.onload = () => {
  drawings
    .filter(svg => svg.getElementsByTagName('g').length > 0)
    .forEach(svg => {
      console.log("Removing size constraints from SVG diagrams...");
      resetViewportConstraints(svg);

      console.log("Identifying headings that can be scrolled...")
      const g = svg.getElementsByTagName('g')[0];
      const nodes = [].slice.call(g.childNodes, 0, g.childNodes.length).filter(node => node.tagName);

      nodes.forEach((node, index) => {
        // Set opacity for box enclosing participants
        const colours = ['#E06666', '#94C47D', '#D5A6BD', '#6FA8DC']


        if (node.tagName === 'rect' && colours.indexOf(node.getAttribute('fill')) !== -1) {
          console.log('Found enclosing box')
          node.setAttribute('fill-opacity', '0.5')
        }

        if ((node.tagName === 'text' && node.getAttribute("font-size") === "14" &&
          ((index > 0 && ['rect', 'text'].includes(nodes[index - 1].tagName)) || nodes[index + 1].tagName === 'ellipse'))
          || (['rect', 'ellipse'].includes(node.tagName) && node.getAttribute("fill") === "#FEFECE")
          || findActor(node)) {
          // SVG paints onto the screen in order, so remove the original heading
          // Add to the end of the child nodes - they'll then appear on top as scroll down/up
          const parent = node.parentNode;
          const clone = node.cloneNode(true);

          parent.removeChild(node);
          clone.setAttribute('class', 'heading-element');
          g.appendChild(clone);
        }
      })

      translateHeadings(svg);
    });
};

window.addEventListener('scroll', (e) => {
  drawings.forEach(svg => translateHeadings(svg));
});
