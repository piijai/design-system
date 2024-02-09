type HtmlFunction = () => string

export interface BalCheckboxOption {
  value: any
  checked: boolean
  name?: string
  label?: string
  html?: HtmlFunction | string
  labelHidden: boolean
  flat: boolean
  interface: BalProps.BalCheckboxInterface
  disabled: boolean
  readonly: boolean
  required: boolean
  nonSubmit: boolean
  invalid: boolean
  hidden: boolean // deprecated
}
