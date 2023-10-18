describe('bal-popup', () => {
  function testPopup(name: string, platform: 'mobile' | 'desktop' = 'desktop') {
    cy.wait(400).compareSnapshot(`popup-${name}-${platform}`)
    cy.getByTestId(`${name}-trigger`).click()
    cy.wait(400).compareSnapshot(`popup-${name}-${platform}-open`)
    cy.getByTestId(`${name}-trigger`).click()
  }

  context('mobile', () => {
    beforeEach(() => {
      cy.visit('/components/bal-popup/test/bal-popup.visual.html').platform('mobile').waitForDesignSystem().wait(400)
    })

    it('basic component mobile', () => {
      testPopup('basic', 'mobile')
      testPopup('basic-backdrop-arrow', 'mobile')
      testPopup('basic-backdrop-offset', 'mobile')
    })

    it('placement property mobile', () => {
      testPopup('placement-right', 'mobile')
      testPopup('placement-left', 'mobile')
      testPopup('placement-top', 'mobile')
      testPopup('placement-bottom', 'mobile')
    })

    it('tabs combination mobile', () => {
      testPopup('tabs', 'mobile')
    })

    it('variant property mobile', () => {
      cy.compareSnapshot(`popup-fullscreen-mobile`)
      cy.getByTestId(`fullscreen-trigger`).click()
      cy.compareSnapshot(`popup-fullscreen-mobile-open`)
      cy.get('body').type('{esc}')

      cy.compareSnapshot(`popup-drawer-mobile`)
      cy.getByTestId(`drawer-trigger`).click()
      cy.compareSnapshot(`popup-drawer-mobile-open`)
      cy.get('body').type('{esc}')
    })
  })

  context('desktop', () => {
    beforeEach(() => {
      cy.visit('/components/bal-popup/test/bal-popup.visual.html').platform('desktop').waitForDesignSystem().wait(400)
    })

    it('basic component desktop', () => {
      testPopup('basic')
      testPopup('basic-backdrop-arrow')
      testPopup('basic-backdrop-offset')
    })

    it.skip('placement property desktop', () => {
      testPopup('placement-right')
      testPopup('placement-left')
      testPopup('placement-top')
      testPopup('placement-bottom')
    })

    it('tabs combination desktop', () => {
      testPopup('tabs')
    })

    it('variant property desktop', () => {
      cy.wait(400).compareSnapshot(`popup-fullscreen-desktop`)
      cy.getByTestId(`fullscreen-trigger`).click()
      cy.wait(400).compareSnapshot(`popup-fullscreen-desktop-open`)
      cy.get('body').type('{esc}')

      cy.wait(400).compareSnapshot(`popup-drawer-desktop`)
      cy.getByTestId(`drawer-trigger`).click()
      cy.wait(400).compareSnapshot(`popup-drawer-desktop-open`)
      cy.get('body').type('{esc}')
    })
  })
})
