describe('css-grid.visual', () => {
  beforeEach(() => cy.visit('/test/css-grid.visual.html').platform('desktop'))

  it('basic', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('css-grid-basic-desktop')
    cy.getByTestId('column-sizes').compareSnapshot('css-grid-column-sizes-desktop')
    cy.getByTestId('column-offset').compareSnapshot('css-grid-column-offset-desktop')
    cy.getByTestId('rows').compareSnapshot('css-grid-rows-desktop')
    cy.getByTestId('nested').compareSnapshot('css-grid-nested-desktop')
    cy.getByTestId('space').compareSnapshot('css-grid-space-desktop')
    cy.getByTestId('breakpoint').compareSnapshot('css-grid-breakpoint-desktop')
    cy.getByTestId('vertical-alignment').compareSnapshot('css-grid-vertical-alignment-desktop')
    cy.getByTestId('horizontal-alignment').compareSnapshot('css-grid-horizontal-alignment-desktop')
    cy.getByTestId('stratch').compareSnapshot('css-grid-stratch-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('css-grid-basic-tablet')
    cy.getByTestId('column-sizes').compareSnapshot('css-grid-column-sizes-tablet')
    cy.getByTestId('column-offset').compareSnapshot('css-grid-column-offset-tablet')
    cy.getByTestId('rows').compareSnapshot('css-grid-rows-tablet')
    cy.getByTestId('nested').compareSnapshot('css-grid-nested-tablet')
    cy.getByTestId('space').compareSnapshot('css-grid-space-tablet')
    cy.getByTestId('breakpoint').compareSnapshot('css-grid-breakpoint-tablet')
    cy.getByTestId('vertical-alignment').compareSnapshot('css-grid-vertical-alignment-tablet')
    cy.getByTestId('horizontal-alignment').compareSnapshot('css-grid-horizontal-alignment-tablet')
    cy.getByTestId('stratch').compareSnapshot('css-grid-stratch-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('css-grid-basic-mobile')
    cy.getByTestId('column-sizes').compareSnapshot('css-grid-column-sizes-mobile')
    cy.getByTestId('column-offset').compareSnapshot('css-grid-column-offset-mobile')
    cy.getByTestId('rows').compareSnapshot('css-grid-rows-mobile')
    cy.getByTestId('nested').compareSnapshot('css-grid-nested-mobile')
    cy.getByTestId('space').compareSnapshot('css-grid-space-mobile')
    cy.getByTestId('breakpoint').compareSnapshot('css-grid-breakpoint-mobile')
    cy.getByTestId('vertical-alignment').compareSnapshot('css-grid-vertical-alignment-mobile')
    cy.getByTestId('horizontal-alignment').compareSnapshot('css-grid-horizontal-alignment-mobile')
    cy.getByTestId('stratch').compareSnapshot('css-grid-stratch-mobile')
  })
})

describe('deprecated-css-grid.visual', () => {
  beforeEach(() => cy.visit('/test/deprecated/css-grid.visual.html').platform('desktop'))

  it('basic', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('css-grid-basic-desktop')
    cy.getByTestId('column-sizes').compareSnapshot('css-grid-column-sizes-desktop')
    cy.getByTestId('column-offset').compareSnapshot('css-grid-column-offset-desktop')
    cy.getByTestId('rows').compareSnapshot('css-grid-rows-desktop')
    cy.getByTestId('nested').compareSnapshot('css-grid-nested-desktop')
    cy.getByTestId('space').compareSnapshot('css-grid-space-desktop')
    cy.getByTestId('breakpoint').compareSnapshot('css-grid-breakpoint-desktop')
    cy.getByTestId('vertical-alignment').compareSnapshot('css-grid-vertical-alignment-desktop')
    cy.getByTestId('horizontal-alignment').compareSnapshot('css-grid-horizontal-alignment-desktop')
    cy.getByTestId('stratch').compareSnapshot('css-grid-stratch-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('css-grid-basic-tablet')
    cy.getByTestId('column-sizes').compareSnapshot('css-grid-column-sizes-tablet')
    cy.getByTestId('column-offset').compareSnapshot('css-grid-column-offset-tablet')
    cy.getByTestId('rows').compareSnapshot('css-grid-rows-tablet')
    cy.getByTestId('nested').compareSnapshot('css-grid-nested-tablet')
    cy.getByTestId('space').compareSnapshot('css-grid-space-tablet')
    cy.getByTestId('breakpoint').compareSnapshot('css-grid-breakpoint-tablet')
    cy.getByTestId('vertical-alignment').compareSnapshot('css-grid-vertical-alignment-tablet')
    cy.getByTestId('horizontal-alignment').compareSnapshot('css-grid-horizontal-alignment-tablet')
    cy.getByTestId('stratch').compareSnapshot('css-grid-stratch-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('css-grid-basic-mobile')
    cy.getByTestId('column-sizes').compareSnapshot('css-grid-column-sizes-mobile')
    cy.getByTestId('column-offset').compareSnapshot('css-grid-column-offset-mobile')
    cy.getByTestId('rows').compareSnapshot('css-grid-rows-mobile')
    cy.getByTestId('nested').compareSnapshot('css-grid-nested-mobile')
    cy.getByTestId('space').compareSnapshot('css-grid-space-mobile')
    cy.getByTestId('breakpoint').compareSnapshot('css-grid-breakpoint-mobile')
    cy.getByTestId('vertical-alignment').compareSnapshot('css-grid-vertical-alignment-mobile')
    cy.getByTestId('horizontal-alignment').compareSnapshot('css-grid-horizontal-alignment-mobile')
    cy.getByTestId('stratch').compareSnapshot('css-grid-stratch-mobile')
  })
})
