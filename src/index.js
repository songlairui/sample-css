import "./index.css";
import { h } from "./utils/render";

const pages = _LIST_;

const meta = {
  type: "ul",
  children: pages.map(file => ({
    type: "li",
    children: [
      {
        type: "a",
        props: { href: `./${file}` },
        children: [{ type: "TEXT", props: { value: file } }]
      }
    ]
  }))
};

const $el = document.querySelector("#list");

$el.replaceWith(h(meta));
