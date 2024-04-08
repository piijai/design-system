import { waitAfterFramePaint } from '../helpers'
import { DropdownComponent } from './component'

export type BalBaseOption<TValue = string> = {
  value: TValue
  label: string
}

export type BalOptionOptions = {
  // state values
  disabled: boolean
  invalid: boolean
  selected: boolean
  focused: boolean
  hidden: boolean
  // visual values
  multiline: boolean
  checkbox: boolean
}

export type BalOption<TValue = string> = BalBaseOption<TValue> & BalOptionOptions

export const mapOption = (option: Partial<BalOption>): BalOption => {
  return newBalOption(
    {
      value: option.value,
      label: option.label,
    },
    option,
  )
}

export const newBalOption = <TValue = string>(
  option: BalBaseOption<TValue>,
  options?: Partial<BalOptionOptions>,
): BalOption<TValue> => {
  const data: BalOption<TValue> = {
    ...option,
    disabled: false,
    invalid: false,
    selected: false,
    focused: false,
    hidden: false,
    multiline: false,
    checkbox: false,
  }

  if (options) {
    data.disabled = options.disabled === undefined ? data.disabled : options.disabled
    data.invalid = options.invalid === undefined ? data.invalid : options.invalid
    data.selected = options.selected === undefined ? data.selected : options.selected
    data.focused = options.focused === undefined ? data.focused : options.focused
    data.hidden = options.hidden === undefined ? data.hidden : options.hidden
    data.multiline = options.multiline === undefined ? data.multiline : options.multiline
    data.checkbox = options.checkbox === undefined ? data.checkbox : options.checkbox
  }

  return data
}

export class DropdownOptionUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
    this.optionChanged()
  }

  async componentWillRender() {
    if (this.component.listEl) {
      this.component.nativeOptions = await this.component.listEl.getValues()
    }
  }

  hasPropOptions(): boolean {
    return this.component.options && this.component.options.length > 0
  }

  async optionChanged() {
    this.component.rawOptions = this.component.options.map(mapOption)
    await this.component.valueUtil.updateInputContent()
  }

  async listenToOptionChange(_ev: BalEvents.BalOptionChange) {
    const newSelectedValues = (await this.component.listEl?.getSelectedValues()) || []
    this.component.valueUtil.updateRawValueBySelection(newSelectedValues)
    if (!this.component.multiple) {
      this.component.popupUtil.collapseList()
    }
  }
}
