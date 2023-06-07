describe('bal-input', () => {
  beforeEach(() => cy.visit('/components/form/bal-input/test/bal-input.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('input-basic')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('input-basic-mobile')
  })

  it('disabled component', () => {
    cy.platform('desktop')
    cy.getByTestId('disabled').compareSnapshot('input-disabled')

    cy.platform('mobile')
    cy.getByTestId('disabled').compareSnapshot('input-disabled-mobile')
  })

  it('invalid component', () => {
    cy.platform('desktop')
    cy.getByTestId('invalid').compareSnapshot('input-invalid')

    cy.platform('mobile')
    cy.getByTestId('invalid').compareSnapshot('input-invalid-mobile')
  })

  it('field component', () => {
    cy.platform('desktop')
    cy.getByTestId('field').compareSnapshot('input-field')

    cy.platform('mobile')
    cy.getByTestId('field').compareSnapshot('input-field-mobile')
  })
})
