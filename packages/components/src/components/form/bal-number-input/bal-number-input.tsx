import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import isNil from 'lodash.isnil'
import {
  ListenToConfig,
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  defaultConfig,
} from '../../../utils/config'
import { ACTION_KEYS, isCtrlOrCommandKey, NUMBER_KEYS } from '../../../utils/constants/keys.constant'
import {
  FormInput,
  getInputTarget,
  getNativeInputValue,
  getUpcomingValue,
  inputHandleBlur,
  inputHandleChange,
  inputHandleClick,
  inputHandleFocus,
  inputHandleHostClick,
  inputHandleReset,
  inputListenOnClick,
  inputSetBlur,
  inputSetFocus,
  stopEventBubbling,
} from '../../../utils/form-input'
import { debounceEvent } from '../../../utils/helpers'
import { inheritAttributes } from '../../../utils/attributes'
import {
  getDecimalSeparator,
  getThousandSeparator,
  parseFloatString,
  formatFloatString,
  getNegativeSymbol,
  getDecimalSeparators,
} from '../../../utils/number'
import { formatInputValue } from './bal-input.utils'
import { BEM } from '../../../utils/bem'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../../utils/form'

@Component({
  tag: 'bal-number-input',
  styleUrls: {
    css: 'bal-number-input.sass',
  },
})
export class NumberInput
  implements ComponentInterface, BalConfigObserver, FormInput<number | undefined>, BalAriaFormLinking
{
  private inputId = `bal-number-input-${numberInputIds++}`
  private inheritedAttributes: { [k: string]: any } = {}

  nativeInput?: HTMLInputElement
  inputValue = this.value
  initialValue = 0

  @Element() el!: HTMLElement

  @State() focused = false
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * Defines the allowed decimal points for the `number-input`.
   */
  @Prop() decimal = 0

  /**
   * Adds a suffix the the input-value after blur.
   */
  @Prop() suffix?: string

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder?: string

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true` the input value has 0 as default value
   */
  @Prop() exactNumber = false

  /**
   * The maximum value, which must not be less than its minimum (min attribute) value.
   */
  @Prop() max?: string

  /**
   * The minimum value, which must not be greater than its maximum (max attribute) value.
   */
  @Prop() min?: string

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: number = undefined

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<BalEvents.BalNumberInputInputDetail>

  /**
   * Emitted when the value has changed.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalNumberInputChangeDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalNumberInputBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalNumberInputFocusDetail>

  /**
   * Emitted when a keyboard key has pressed.
   */
  @Event() balKeyPress!: EventEmitter<BalEvents.BalNumberInputKeyPressDetail>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    inputListenOnClick(this, ev)
  }

  private resetHandlerTimer?: NodeJS.Timer

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      inputHandleReset(this, this.initialValue, this.resetHandlerTimer)
    }
  }

  connectedCallback() {
    this.debounceChanged()
    this.initialValue = this.value || 0
  }

  componentDidLoad() {
    this.inputValue = this.value
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region

    if (!this.focused && this.nativeInput) {
      this.nativeInput.value = this.getFormattedValue()
    }
  }

  /**
   * Sets focus on the native `input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    inputSetFocus(this)
  }

  /**
   * Sets blur on the native `input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    inputSetBlur(this)
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput!)
  }

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
  }

  private getAllowedKeys() {
    return [...NUMBER_KEYS, ...ACTION_KEYS, ...getDecimalSeparators(), getNegativeSymbol()]
  }

  private getRawValue(): string {
    return typeof this.value === 'number' && !isNaN(this.value) ? this.value.toString() : (this.value || '').toString()
  }

  private getFormattedValue(): string {
    const value = this.getRawValue()
    const suffix = this.suffix !== undefined && value !== undefined && value !== '' ? ' ' + this.suffix : ''
    return `${formatInputValue(value, this.decimal)}${suffix}`
  }

  private onInput = (ev: Event) => {
    const input = getInputTarget(ev)
    if (input) {
      const parsedValue = parseFloat(parseFloat(parseFloatString(input.value)).toFixed(this.decimal))
      if (!isNaN(parsedValue)) {
        this.inputValue = parsedValue
      } else {
        if (!this.decimal && input.value !== getNegativeSymbol() && input.value !== getDecimalSeparator()) {
          this.inputValue = undefined
          input.value = ''
        }
      }
    }

    this.balInput.emit(this.inputValue)
  }

  private onBlur = (ev: FocusEvent) => {
    inputHandleBlur(this, ev)

    const input = getInputTarget(ev)
    if (input && (getDecimalSeparators().indexOf(input.value) >= 0 || input.value === getNegativeSymbol())) {
      this.inputValue = undefined
      input.value = ''
    }

    if (this.exactNumber && input && (input.value === undefined || input.value === '' || input.value === null)) {
      this.inputValue = 0
      input.value = '0'
    }

    inputHandleChange(this)
  }

  private onKeydown = (ev: KeyboardEvent) => {
    if (!isNil(ev) && !isCtrlOrCommandKey(ev)) {
      if (!this.getAllowedKeys().includes(ev.key)) {
        return stopEventBubbling(ev)
      }

      const value = getNativeInputValue(this)

      if (getDecimalSeparators().indexOf(ev.key) >= 0) {
        if (!this.decimal || value.split('').some(el => getDecimalSeparators().includes(el))) {
          return stopEventBubbling(ev)
        }
      }

      if (ev.key === getNegativeSymbol()) {
        if (value.length !== 0) {
          return stopEventBubbling(ev)
        }
      }

      if ([...NUMBER_KEYS, ...getDecimalSeparators(), getNegativeSymbol()].indexOf(ev.key) >= 0) {
        const newValue = getUpcomingValue(this, ev)
        let separator = ''

        value.split('').some(el => {
          if (getDecimalSeparators().includes(el)) {
            separator = el
          }
        })

        if (separator !== '') {
          const decimalValue = separator !== '' && newValue.includes(separator) ? newValue?.split(separator)[1] : ''
          if (decimalValue && decimalValue.length > this.decimal) {
            return stopEventBubbling(ev)
          }
        }
      }
    }
  }

  private onFocus = (ev: FocusEvent) => inputHandleFocus(this, ev)

  private onClick = (ev: MouseEvent) => inputHandleClick(this, ev)

  private handleClick = (ev: MouseEvent) => inputHandleHostClick(this, ev)

  get pattern() {
    let suffix = this.suffix || ''
    if (suffix !== '') {
      suffix = ` ${suffix}`
    }

    let thousandSeparator = getThousandSeparator()
    if (thousandSeparator === '’') {
      thousandSeparator = "'"
    }

    return `^-?([1-9]\d{0,2}(?:${thousandSeparator}\d{3})*|\d+)(?:\\${getDecimalSeparator()}\d{${this.decimal}})?$`
  }

  render() {
    const value = this.focused ? formatFloatString(this.getRawValue()) : this.getFormattedValue()
    if (this.nativeInput && this.nativeInput.value) {
      this.nativeInput.value = value
    }
    const block = BEM.block('number-input')

    return (
      <Host
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          ...block.class(),
        }}
      >
        <input
          class={{
            'input': true,
            'is-disabled': this.disabled || this.readonly,
            'is-danger': this.invalid,
          }}
          data-testid="bal-number-input"
          ref={input => (this.nativeInput = input)}
          id={this.ariaForm.controlId || this.inputId}
          aria-labelledby={this.ariaForm.labelId}
          aria-describedby={this.ariaForm.messageId}
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : null}
          name={this.name}
          disabled={this.disabled}
          placeholder={this.placeholder || ''}
          readonly={this.readonly}
          required={this.required}
          pattern={this.pattern}
          min={this.min}
          max={this.max}
          value={value}
          onInput={e => this.onInput(e)}
          onFocus={e => this.onFocus(e)}
          onBlur={e => this.onBlur(e)}
          onClick={this.onClick}
          onKeyDown={e => this.onKeydown(e)}
          onKeyPress={e => this.balKeyPress.emit(e)}
          {...this.inheritedAttributes}
        />
      </Host>
    )
  }
}

let numberInputIds = 0
