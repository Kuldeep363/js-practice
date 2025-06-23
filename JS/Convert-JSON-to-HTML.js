/*
    Problem Statement -
        Given a JSON as an object with type, children, and property of the
        DOM element, write a function to convert the object to the actual
        DOM.
    const json = {
        type: 'div',
        props: { id: 'hello', class: "foo" },
        children: [
            {type: 'h1', children: 'HELLO' },
            {type: 'p', children: [{type: 'span', props: {class: "bar" },children:'World' }] }
        ]
    };
    JSONtoHTML(json);
    Output:
    <div id="hello" class="foo" >
        <h1> HELLO </h1>
        <p>
            <span class="bar" > World </span>
        </p>
    </div>
*/

function JSONtoHTML(json) {
  let html = ``;
  if (!Array.isArray(json)) {
    html = `<${json.type} `;
    for (const [key, value] of Object.entries(json.props || {})) {
      html += `${key}=${value} `;
    }
    html += `>`;
    if (typeof json.children === "string") {
      html += ` ${json.children} </${json.type}>`;
      return html;
    }
    for (const child of json.children) {
        html += JSONtoHTML(child);
    }
    html += ` </${json.type}>`
    return html;
  }
  for (const element of json) {
    html += JSONtoHTML(element);
  }
  return html;
}

const JSON = [
  {
    type: "div",
    props: { id: "hello", class: "foo" },
    children: [
      { type: "h1", children: "HELLO" },
      {
        type: "p",
        children: [
          { type: "span", props: { class: "bar" }, children: "World" },
        ],
      },
    ],
  },
  {
    type: "section",
    props: { id: "hello-2", class: "foo-2" },
    children: [
      { type: "h1", children: "HELLO-2" },
      { type: "p", children: [{ type: "span", children: "World" }] },
    ],
  },
];
console.log(JSONtoHTML(JSON));
