## Cypress组件级测试初探（Vue3+Vite）

Cypress7.0开始将CypressComponent Test Runner与Cypress Test Runner捆绑在一起，除了原有的E2E测试，目前可以支持组件级测试了；它同时支持Vue2和vue3，并支持Typescript。

### 创建vue3+vite工程

```
npm init @vitejs/app
```

### 安装cypress

安装 Cypress 和 Vite Dev Server 以及 Vue 适配器

```
npm install cypress @cypress/vue@next @cypress/vite-dev-server --dev
```

### 配置Cypress组件测试运行器

- 找到vue项目下的/cypress/plugins/index.js，配置vite为server启动器

```
<project dir>/cypress/plugins/index.js
```

```
const { startDevServer } = require('@cypress/vite-dev-server')

module.exports = (on, config) => {
  on('dev-server:start', options =>
    startDevServer({
      options
    })
  )

  return config
}
```

### 配置cypress.json，指定测试路径

```
{
  "component": {
    "componentFolder": "src",
    "testFiles": "**/*.spec.ts"
  }
}
```

### 编写测试用例

这里是针对vue3+vite的demo中HelloWorld组件进行测试。

```
import { mount } from '@cypress/vue'
import HelloWorld from '../components/HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders a message', () => {
    const msg = 'Hello Cypress Component Testing!'
    mount(HelloWorld, {
      propsData: {
        msg
      }
    })

    cy.get('h1').should('have.text', msg)
    cy.get('span').eq(0)
    cy.get('button').click()
    cy.get('span').should(($span) => {
      expect($span.get(0).innerText).to.eq('1') })
  })
})
```

### 运行测试

- 打开cypress运行器界面，执行测试

```
yarn cypress open-ct # or npx cypress open-ct
```

### 初体验

作为jest+vue-test-utils方案的替代

- 可以让用例在真实浏览器中运行，让测试更贴近用户体验
- 测试运行全程可视化，可以准确的看到页面渲染的内容，不需要再使用`console.log(wrapper.html())`去定位问题了
- 由 Cypress 提供支持 - 最流行和最可靠的 E2E 测试工具