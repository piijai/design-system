describe('css-spacing.visual', () => {
  beforeEach(() => cy.visit('/test/css-spacing.visual.html').platform('desktop').waitForDesignSystem())

  it('basic', () => {
    cy.platform('desktop')
    cy.getByTestId('padding').testVisual('css-spacing-padding-desktop')
    cy.getByTestId('padding-top').testVisual('css-spacing-padding-top-desktop')
    cy.getByTestId('padding-bottom').testVisual('css-spacing-padding-bottom-desktop')
    cy.getByTestId('padding-left').testVisual('css-spacing-padding-left-desktop')
    cy.getByTestId('padding-right').testVisual('css-spacing-padding-right-desktop')
    cy.getByTestId('padding-x').testVisual('css-spacing-padding-x-desktop')
    cy.getByTestId('padding-y').testVisual('css-spacing-padding-y-desktop')

    cy.getByTestId('margin').testVisual('css-spacing-margin-desktop')
    cy.getByTestId('margin-top').testVisual('css-spacing-margin-top-desktop')
    cy.getByTestId('margin-bottom').testVisual('css-spacing-margin-bottom-desktop')
    cy.getByTestId('margin-left').testVisual('css-spacing-margin-left-desktop')
    cy.getByTestId('margin-right').testVisual('css-spacing-margin-right-desktop')
    cy.getByTestId('margin-x').testVisual('css-spacing-margin-x-desktop')
    cy.getByTestId('margin-y').testVisual('css-spacing-margin-y-desktop')

    cy.platform('tablet')
    cy.getByTestId('padding').testVisual('css-spacing-padding-tablet')
    cy.getByTestId('padding-top').testVisual('css-spacing-padding-top-tablet')
    cy.getByTestId('padding-bottom').testVisual('css-spacing-padding-bottom-tablet')
    cy.getByTestId('padding-left').testVisual('css-spacing-padding-left-tablet')
    cy.getByTestId('padding-right').testVisual('css-spacing-padding-right-tablet')
    cy.getByTestId('padding-x').testVisual('css-spacing-padding-x-tablet')
    cy.getByTestId('padding-y').testVisual('css-spacing-padding-y-tablet')

    cy.getByTestId('margin').testVisual('css-spacing-margin-tablet')
    cy.getByTestId('margin-top').testVisual('css-spacing-margin-top-tablet')
    cy.getByTestId('margin-bottom').testVisual('css-spacing-margin-bottom-tablet')
    cy.getByTestId('margin-left').testVisual('css-spacing-margin-left-tablet')
    cy.getByTestId('margin-right').testVisual('css-spacing-margin-right-tablet')
    cy.getByTestId('margin-x').testVisual('css-spacing-margin-x-tablet')
    cy.getByTestId('margin-y').testVisual('css-spacing-margin-y-tablet')

    cy.platform('mobile')
    cy.getByTestId('padding').testVisual('css-spacing-padding-mobile')
    cy.getByTestId('padding-top').testVisual('css-spacing-padding-top-mobile')
    cy.getByTestId('padding-bottom').testVisual('css-spacing-padding-bottom-mobile')
    cy.getByTestId('padding-left').testVisual('css-spacing-padding-left-mobile')
    cy.getByTestId('padding-right').testVisual('css-spacing-padding-right-mobile')
    cy.getByTestId('padding-x').testVisual('css-spacing-padding-x-mobile')
    cy.getByTestId('padding-y').testVisual('css-spacing-padding-y-mobile')

    cy.getByTestId('margin').testVisual('css-spacing-margin-mobile')
    cy.getByTestId('margin-top').testVisual('css-spacing-margin-top-mobile')
    cy.getByTestId('margin-bottom').testVisual('css-spacing-margin-bottom-mobile')
    cy.getByTestId('margin-left').testVisual('css-spacing-margin-left-mobile')
    cy.getByTestId('margin-right').testVisual('css-spacing-margin-right-mobile')
    cy.getByTestId('margin-x').testVisual('css-spacing-margin-x-mobile')
    cy.getByTestId('margin-y').testVisual('css-spacing-margin-y-mobile')
  })
})
