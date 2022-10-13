
const templateNode = document.createElement('div')
document.body.append(templateNode)

templateNode.innerHTML = `
<template id="templateLink">
<a href="./1-init.html">init</a>
<a href="./2-template.html">template</a>
<a href="./3-props.html">props</a>
<a href="./4-shadow.html">shadow</a>
<a href="./5-life.html">life</a>
<a href="./index.html">index</a>
</template>
`

class LinkItem extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    let tempalte = document.getElementById('templateLink')
    let content = tempalte.content.cloneNode(true)
    this.append(content)
  }
}

window.customElements.define('link-nav', LinkItem)