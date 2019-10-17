function createElement(type, attributes = {}, child = []) {
  let element = {};
  element.type = type;

  if (isEmptyObj(attributes)) {
    if (Array.isArray(child)) {
      element.child = child;
    } else {
      element.text = child;
    }
  } else {
    element.attributes = attributes;
    if (Array.isArray(child)) {
      element.child = child;
    } else {
      element.text = child;
    }
  }

  return element;
}

const app = createElement(
  'div',
  { style: { backgroundColor: 'red' } },
  [
    createElement('span', undefined, 'Hello world'),
    createElement('br'),
    'This is just a text node',
    createElement('div', { textContent: 'Text content' }),
  ],
);

function isEmptyObj(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function render(element, node = document.getElementById('app')) {
  let newEl = document.createElement(element.type);
  if (element.text) newEl.innerHTML = element.text;

  for (var name in element.attributes) {
    var value = element.attributes[name];
    if (name === 'textContent') {
      newEl.innerHTML = value;
      break;
    }
    for (var first in value) {
      newEl[name][first] = value[first];
    }
  }

  for (let el in element.child) {
    if (typeof element.child[el] === 'string') {
      newEl.innerHTML += element.child[el];
    } else {
      render(element.child[el], newEl);
    }
  }

  node.appendChild(newEl);
}

render(app, document.getElementById('app'));
