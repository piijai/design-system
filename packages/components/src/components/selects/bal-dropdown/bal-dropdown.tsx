import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  State,
  Watch,
  Listen,
  Event,
  EventEmitter,
} from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { ariaBooleanToString } from '../../../utils/aria'
import { areArraysEqual, isArrowDownKey, isArrowUpKey, isEnterKey, isSpaceKey } from '@baloise/web-app-utils'
import isNil from 'lodash.isnil'
import { stopEventBubbling } from '../../../utils/form-input'
import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom'

@Component({
  tag: 'bal-dropdown',
  styleUrls: {
    css: 'bal-dropdown.sass',
  },
})
export class Dropdown implements ComponentInterface, Loggable {
  private id = `bal-dropdown-${balDropdownIds++}`
  private panelEl: HTMLDivElement | undefined
  private listEl: HTMLBalOptionListElement | undefined
  private panelCleanup?: () => void

  @Element() el!: HTMLElement

  @State() rawValue: string[] = []
  @State() hasFocus = false
  @State() isExpanded = false
  @State() inputValue = ''
  @State() inputContent = ''

  @State() labelToFocus = ''
  private labelToFocusTimeout!: NodeJS.Timeout

  log!: LogInstance

  @Logger('bal-dropdown')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the placeholder of the component. Only shown when the value is empty
   */
  @Prop() placeholder = ''

  /**
   * The value of the selected options.
   */
  @Prop() value?: string | string[] = []
  @Watch('value')
  valueChanged(newValue: string | string[] | undefined, oldValue: string | string[] | undefined) {
    const newValueType = typeof newValue
    const oldValueType = typeof oldValue

    if (newValueType !== oldValueType) {
      this.updateRawValueByValueProp(newValue)
    }

    if (newValueType === 'string' && newValue !== oldValue) {
      this.updateRawValueByValueProp(newValue)
    }

    if (Array.isArray(newValue) && Array.isArray(oldValue) && !areArraysEqual(newValue, oldValue)) {
      this.updateRawValueByValueProp(newValue)
    }
  }

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop() disabled = false

  /**
   * If `true`, the user can select multiple options.
   */
  @Prop() multiple = false

  /**
   * If `true`, the component will be shown as invalid
   */
  @Prop() invalid = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalDropdownChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.valueChanged(this.value, undefined)
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('balOptionChange')
  async listenToOptionChange(_ev: BalEvents.BalOptionChange) {
    const newSelectedValues = (await this.listEl?.getSelectedOptions()) || []
    this.updateRawValueBySelection(newSelectedValues)
  }

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (ev.target) {
      if (this.disabled && ev.target === this.el) {
        stopEventBubbling(ev)
      }
    }
  }

  @Listen('click', { target: 'document' })
  async listenOnClickOutside(ev: UIEvent) {
    if (this.isExpanded) {
      if (!this.el.contains(ev.target as Node)) {
        console.log('listenOnClickOutside')
        this.isExpanded = false
        this.listEl?.resetFocus()
      }
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateRawValueByValueProp(newValue: string | string[] = []) {
    let newRawValue: string[] = []

    if (!isNil(newValue) && newValue !== '') {
      if (Array.isArray(newValue)) {
        newRawValue = [...newValue.filter(v => !isNil(v))]
      } else {
        if (newValue.split('').includes(',')) {
          newRawValue = [
            ...newValue
              .split(',')
              .filter(v => v)
              .map(v => v.trim()),
          ]
        } else {
          newRawValue = [newValue]
        }
      }
    }
    this.updateRawValue(newRawValue)
  }

  private updateRawValueBySelection(newRawValue: string[] = []) {
    this.updateRawValue(newRawValue)
    if (this.multiple) {
      this.balChange.emit(this.rawValue)
    } else {
      this.balChange.emit(this.rawValue[0])
      this.collapseList()
    }
  }

  private updateRawValue(newRawValue: string[] = []) {
    this.rawValue = newRawValue
    this.inputValue = newRawValue.join(',')
    this.inputContent = newRawValue.join(', ')
  }

  private focusOptionByLabel(key: string) {
    this.labelToFocus = (this.labelToFocus + key).trim()
    if (this.labelToFocus.length > 0) {
      clearTimeout(this.labelToFocusTimeout)
      this.labelToFocusTimeout = setTimeout(async () => {
        await this.listEl?.focusByLabel(this.labelToFocus)
        this.labelToFocus = ''
      }, 600)
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private handleHostClick = (ev: MouseEvent) => {
    if (this.disabled) {
      stopEventBubbling(ev)
    }
  }

  private handleFocus = (_ev: FocusEvent) => {
    this.hasFocus = true
  }

  private handleBlur = (_ev: FocusEvent) => {
    this.hasFocus = false
  }

  private handleClick = (_ev: MouseEvent) => {
    if (this.isExpanded) {
      this.collapseList()
    } else {
      this.expandList()
    }
  }

  private updatePanelPosition = (referenceEl: HTMLElement, floatingEl: HTMLElement) => () => {
    computePosition(referenceEl, floatingEl, {
      placement: 'bottom-start',
      middleware: [flip(), shift()],
    }).then(({ x, y }) => {
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    })
  }

  private expandList() {
    if (this.panelEl) {
      this.panelCleanup = autoUpdate(this.el, this.panelEl, this.updatePanelPosition(this.el, this.panelEl))
    }
    this.isExpanded = true
    this.listEl?.focusFirst()
  }

  private collapseList() {
    this.isExpanded = false
    this.listEl?.resetFocus()
    if (this.panelCleanup) {
      this.panelCleanup()
    }
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.isExpanded) {
      if (isArrowDownKey(ev)) {
        stopEventBubbling(ev)
        this.listEl?.focusNext()
      } else if (isArrowUpKey(ev)) {
        stopEventBubbling(ev)
        this.listEl?.focusPrevious()
      } else if (ev.key === 'Home' || ev.key === 'PageUp') {
        stopEventBubbling(ev)
        this.listEl?.focusFirst()
      } else if (ev.key === 'End' || ev.key === 'PageDown') {
        stopEventBubbling(ev)
        this.listEl?.focusLast()
      } else if (ev.key === 'End' || ev.key === 'PageDown') {
        stopEventBubbling(ev)
        this.listEl?.focusLast()
      } else if (isEnterKey(ev)) {
        stopEventBubbling(ev)
        this.listEl?.selectByFocus()
      } else if (ev.key === 'Tab') {
        this.collapseList()
      } else if (ev.key.length === 1) {
        this.focusOptionByLabel(ev.key)
      }
    } else {
      if (isEnterKey(ev) || isSpaceKey(ev)) {
        stopEventBubbling(ev)
        this.expandList()
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('dropdown')

    return (
      <Host
        class={{
          ...block.class(),
        }}
        id={this.id}
        tabIndex={-1}
        onClick={this.handleHostClick}
      >
        <div
          class={{
            ...block.element('root').class(),
            ...block.element('root').modifier('focused').class(this.hasFocus),
            ...block.element('root').modifier('invalid').class(this.invalid),
            ...block.element('root').modifier('disabled').class(this.disabled),
          }}
          tabindex="0"
          role="button"
          aria-expanded={ariaBooleanToString(this.isExpanded)}
          aria-disabled={ariaBooleanToString(this.disabled)}
          aria-haspopup="listbox"
          onClick={ev => this.handleClick(ev)}
          onFocus={ev => this.handleFocus(ev)}
          onBlur={ev => this.handleBlur(ev)}
          onKeyDown={ev => this.handleKeyDown(ev)}
        >
          <span
            class={{
              ...block.element('root').element('content').class(),
              ...block.element('root').element('content').modifier('disabled').class(this.disabled),
              ...block.element('root').element('content').modifier('placeholder').class(!this.inputContent),
            }}
          >
            {this.inputContent ? this.inputContent : this.placeholder}
          </span>
          <bal-icon
            name="caret-down"
            turn={this.isExpanded}
            color={this.disabled ? 'grey' : this.invalid ? 'danger' : 'primary'}
          ></bal-icon>
        </div>
        <input
          class={{
            ...block.element('native').class(),
          }}
          aria-required={ariaBooleanToString(this.required)}
          aria-invalid={ariaBooleanToString(this.invalid)}
          aria-hidden="true"
          disabled={this.disabled}
          required={this.required}
          tabindex="-1"
          value={this.inputValue}
        />
        <div
          class={{
            ...block.element('list').class(),
            ...block.element('list').modifier('expanded').class(this.isExpanded),
          }}
          ref={panelEl => (this.panelEl = panelEl)}
        >
          <bal-option-list multiple={this.multiple} ref={listEl => (this.listEl = listEl)}>
            <slot></slot>
          </bal-option-list>
        </div>
      </Host>
    )
  }
}

let balDropdownIds = 0
