const $el = document.querySelector(".content");
const $ul = document.querySelector(".content > ul");

const $body = document.documentElement;

const $contents = [1, 100].map(length =>
  Array.from({ length })
    .fill(0)
    .map((_, idx) => {
      const $item = document.createElement("li");
      $item.textContent = `--line- ${idx + 1} --`;
      return $item;
    })
);

let current = 0;

$body.addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;

  $ul.innerHTML = "";
  const oFrag = document.createDocumentFragment();
  $contents[current].forEach($item => {
    oFrag.appendChild($item);
  });
  $ul.appendChild(oFrag);
  current = 1 - current;
});
