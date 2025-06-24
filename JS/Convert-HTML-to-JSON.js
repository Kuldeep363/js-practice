/*
    Problem Statement -
        Write a function that takes a DOM node as input and converts it to the
        JavaScript object. The object should have the type of node, its
        attributes, and all the children.

        <div id="foo" >
            <h1> Hello </h1>
            <p class="bar" >
                <span> World! </span>
            </p>
        </div>
*/

function getAttributes(node) {
  let props = {};
  const attributes = node.attributes;
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    if (attribute) {
      props[attribute.nodeName] = attribute.nodeValue;
    }
  }
  return props;
}

function HTMLtoJSON(node) {
  const result = {};
  const props = getAttributes(node);
  let children = node.innerText;
  if (node.children.length > 0) {
    children = [];
    for (let child of node.children) {
      if (child) children.push(HTMLtoJSON(child));
    }
  }
  if (Object.keys(props).length > 0) {
    result.props = props;
  }
  result.children = children;
  result.type = node.localName;
  return result;
}

const node = document.getElementById("foo");
console.log(HTMLtoJSON(node));
