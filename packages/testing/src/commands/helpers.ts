import { deepReady, Platforms } from '@baloise/design-system-components'

/**
 * Helper fn to identify the element/component
 */
export type isElementType = (el: Cypress.Chainable<JQuery>) => boolean

export const isElement = (el: Cypress.Chainable<JQuery>, name: string) => {
  return typeof el === 'object' && (el as any).length > 0 && (el as any)[0].nodeName === name
}

export const hasClass = (el: Cypress.Chainable<JQuery>, name: string) => {
  return typeof el === 'object' && (el as any).length > 0 && (el as unknown as JQuery).hasClass(name)
}

export const isLabel: isElementType = el => isElement(el, 'LABEL')
export const isAccordion: isElementType = el => isElement(el, 'BAL-ACCORDION')
export const isButton: isElementType = el => isElement(el, 'BAL-BUTTON')
export const isCheckbox: isElementType = el => isElement(el, 'BAL-CHECKBOX')
export const isDatepicker: isElementType = el => isElement(el, 'BAL-DATEPICKER')
export const isInput: isElementType = el => isElement(el, 'BAL-INPUT')
export const isNumberInput: isElementType = el => isElement(el, 'BAL-NUMBER-INPUT')
export const isModal: isElementType = el => isElement(el, 'BAL-MODAL')
export const isRadioGroup: isElementType = el => isElement(el, 'BAL-RADIO-GROUP')
export const isRadio: isElementType = el => isElement(el, 'BAL-RADIO')
export const isSelect: isElementType = el => isElement(el, 'BAL-SELECT')
export const isTag: isElementType = el => isElement(el, 'BAL-TAG')
export const isTabs: isElementType = el => isElement(el, 'BAL-TABS')
export const isSlider: isElementType = el => isElement(el, 'BAL-SLIDER')
export const isHint: isElementType = el => isElement(el, 'BAL-HINT')
export const isTextarea: isElementType = el => isElement(el, 'BAL-TEXTAREA')
export const isCardTitle: isElementType = el => isElement(el, 'BAL-CARD-TITLE')
export const isHeading: isElementType = el => isElement(el, 'BAL-HEADING')
export const isText: isElementType = el => isElement(el, 'BAL-TEXT')

/**
 * Selectors
 */
export const selectors = {
  accordion: {
    button: '.data-test-accordion-trigger > button',
  },
  field: {
    hint: 'bal-field-hint > bal-hint',
  },
  button: {
    main: 'button',
    label: 'bal-text.data-test-button-label',
  },
  checkbox: {
    input: 'input.data-test-checkbox-input',
    label: 'label.data-test-checkbox-label',
    text: 'label.data-test-checkbox-label > bal-text',
  },
  datepicker: {
    input: 'input.data-test-input',
  },
  popover: {
    trigger: 'bal-popover-trigger',
    content: 'bal-popover-content',
  },
  input: {
    main: 'input',
  },
  textarea: {
    main: '> textarea',
  },
  slider: {
    main: 'input.slider',
  },
  modal: {
    main: 'div.modal',
  },
  tag: {
    text: 'bal-text',
  },
  card: {
    title: 'bal-heading',
  },
  radio: {
    input: 'input.data-test-radio-input',
    label: 'label.data-test-radio-label',
    text: 'label.data-test-radio-label > bal-text',
  },
  select: {
    input: 'input.data-test-select-input',
    options: 'button.bal-select__option',
    chips: '.bal-select__selections > bal-tag',
  },
  tabs: {
    tabItems: 'li.data-test-tab-item',
    action: '.data-test-tabs-action',
  },
  toast: {
    main: '.bal-notices > bal-toast',
  },
  snackbar: {
    main: '.bal-notices > bal-snackbar',
  },
  pagination: {
    next: 'bal-button.pagination-next',
    previous: 'bal-button.pagination-previous',
    pages: '.pagination-list > li > bal-button',
    button: '.pagination-list > li > bal-button > button',
  },
  hint: {
    trigger: '.data-test-hint-trigger',
    content: '.data-test-hint-content',
    close: '.data-test-hint-close',
  },
}

/**
 * Executes a command on a child element and wraps back to the main element/component
 */

export const wrapOptions = (options: any) => ({ log: false, ...options })

export const wrapCommand = (
  displayName: string,
  element: Cypress.Chainable<JQuery>,
  message: any,
  fn: ($el: any) => Cypress.Chainable<JQuery> | void,
) => {
  return (selector: string) => {
    return cy
      .wrapComponent(element as any, { log: false })
      .find(selector, { log: false })
      .then($el => {
        Cypress.log({
          type: 'parent',
          $el,
          displayName,
          message,
        })
        if (displayName !== 'contains') {
          return fn($el)
        }
        fn($el)
      })
      .wrapComponent(element as any, { log: false })
  }
}

export const shouldLog = (options?: Partial<Cypress.Loggable>) => options === undefined || options.log !== false
export const log = (displayName: string, message: any = '', $el: any, options?: Partial<Cypress.Loggable>) => {
  if (shouldLog(options)) {
    Cypress.log({
      type: 'parent',
      $el: $el as any,
      displayName,
      message,
    })
  }
}

export const areComponentsReady = ($el: any) => {
  const queue = []
  for (let index = 0; index < $el.length; index++) {
    const element = $el[index]
    queue.push(deepReady(element))
  }
  return Promise.all(queue)
}

export const testOnPlatforms = (platforms: Platforms[], fn: any) => {
  for (let index = 0; index < platforms.length; index++) {
    const platform = platforms[index]

    context(`on ${platform}`, () => {
      beforeEach(() => cy.platform(platform))
      fn()
    })
  }
}
