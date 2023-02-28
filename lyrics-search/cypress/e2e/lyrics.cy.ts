describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('h1').contains('Find that Earworm now')


  })
})
