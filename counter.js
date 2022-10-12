import { define, html } from "hybrids";

export function increaseCount(host) {
  host.count += 1;
}

export default define({
  tag: "simple-counter",
  count: 0,
  render: ({ count }) => html`
    <button onclick="${increaseCount}">
      <slot name="test2"></slot>
      Count: ${count}
      <slot name="test1"></slot>
      <slot></slot>
    </button>
  `
});
