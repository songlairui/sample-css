export function h_self({ type, props = {} }) {
  if (type === "TEXT") {
    return document.createTextNode(props.value);
  }
  console.info("type", type);
  const $el = document.createElement(type);
  Object.entries(props).forEach(([key, value]) => {
    //
    $el.setAttribute(key, value);
  });
  return $el;
}

export function h({ type, props, children }) {
  const hasChild = children && children.length;
  let $children;
  if (hasChild) {
    $children = children.map(h);
  }
  const $self = h_self({ type, props });
  if (hasChild) {
    $children.forEach($child => {
      $self.appendChild($child);
    });
  }
  return $self;
}
