import { mount } from '@cypress/vue'
import HelloWorld from '../../src/components/HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders a message', () => {
    const msg = 'Hello Cypress Component Testing!'
    mount(HelloWorld, {
      propsData: {
        msg
      }
    })

    cy.get('h1').should('have.text', msg)
    cy.get('span').should(($span) => {
      expect($span.get(0).innerText).to.eq('0') })
    cy.get('button').click()
    cy.get('span').should(($span) => {
      expect($span.get(0).innerText).to.eq('1') })
  })
})