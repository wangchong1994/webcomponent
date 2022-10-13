# web-component

### web-component是个啥

原生的组件实现方案

Web Components 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的 web 应用中使用它们。

```html
<user-card image="https://semantic-ui.com/images/avatar2/large/kristy.png"
  name="User Name"
  email="yourmail@some-email.com">
</user-card>
```



​	[tdesign使用示例]( https://tdesign.tencent.com/react/components/button#%E5%B9%BD%E7%81%B5%E6%8C%89%E9%92%AE )

![image-20221012171300976](C:\Users\erekwang\AppData\Roaming\Typora\typora-user-images\image-20221012171300976.png)

![image-20221012132826367](C:\Users\erekwang\AppData\Roaming\Typora\typora-user-images\image-20221012132826367.png)

###  web-component怎么用

#### 原生的用法

1. 创建自定义的标签

`customElements` 接口的实例用来处理 web 文档中的 custom elements — 该对象允许你注册一个 custom element，返回已注册 custom elements 的信息

```js
window.customElements.define('user-card', UserCard);

class UserCard extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        var image = document.createElement('img');
        image.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png';
        this.append(image);
      }
    }
```

2. 使用template标签

   1. 写样式
   2. 直接写标签， 更加易懂

   ```html
    <template id="userCardTemplate">
       <style>
       </style>
       <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" class="image">
       <div class="container">
         <p class="name">User Name</p>
         <p class="email">yourmail@some-email.com</p>
         <button class="button">Follow</button>
       </div>
     </template>
   <script>
       class UserCard extends HTMLElement {
         constructor() {
           super();
         }
         connectedCallback() {
           var templateElem = document.getElementById('userCardTemplate');
           var content = templateElem.content.cloneNode(true);
           this.appendChild(content);
         }
       }
       window.customElements.define('user-card', UserCard);
     </script>
   ```

3. 传props

   ```html
   <script>
       class UserCard extends HTMLElement {
         constructor() {
           super();
         }
         connectedCallback() {
           var templateElem = document.getElementById('userCardTemplate');
           var content = templateElem.content.cloneNode(true);
           content.querySelector('img').setAttribute('src', this.getAttribute('image'));
           content.querySelector('.container>.name').innerText = this.getAttribute('name');
           content.querySelector('.container>.email').innerText = this.getAttribute('email');
           this.appendChild(content);
         }
       }
       window.customElements.define('user-card', UserCard);
     </script>
   ```

4. 使用shadow dom

   1. 创建一个隐藏的、独立的 DOM 附加到一个元素上
   2. shadow `open`时， 外部元素可访问shadow的dom，`closed`时则不可访问

   ```
   let shadow = elementRef.attachShadow({mode: 'open'});
   let shadow = elementRef.attachShadow({mode: 'closed'});
   ```

5. 使用slot

   1. 用法与vue的slot类似，应该说vue的slot就是借鉴了这儿来的

      ```html
      // 定义
      <p><slot name="my-text">My default text</slot></p>
      // 使用
      <my-paragraph>
        <span slot="my-text">Let's have some different text!</span>
      </my-paragraph>
      ```

6. web component的生命周期

   1. constructor

      初始化

   2. connectedCallback

      插入dom

   3. attributeChangedCallback

      属性修改

   4. disconnectedCallback

      从dom移除

#### hybrids

https://hybrids.js.org/#/

```js
import { html, define } from "hybrids";

function increaseCount(host) {
  host.count += 1;
}

export default define({
  tag: "simple-counter",
  count: 0,
  render: ({ count }) => html`
    <button onclick="${increaseCount}">
      Count: ${count}
    </button>
  `,
});
```



### 看看优秀的使用案例

td-doc-demo是怎么实现的

1. 使用slot将外部的react组件放入
2. 内部使用web componnet封装了一套对应的code展示的组件

![image-20221012171300976](file://C:/Users/erekwang/AppData/Roaming/Typora/typora-user-images/image-20221012171300976.png?lastModify=1665644482)

![image-20221012132826367](file://C:/Users/erekwang/AppData/Roaming/Typora/typora-user-images/image-20221012132826367.png?lastModify=1665644482)