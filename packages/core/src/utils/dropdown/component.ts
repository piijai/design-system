import { EventEmitter, FunctionalComponent } from "@stencil/core"
import { DropdownValueUtil } from "./value"

export type DropdownComponent = {
  el: HTMLElement
  nativeEl: HTMLSelectElement | undefined
  panelEl: HTMLDivElement | undefined
  listEl: HTMLBalOptionListElement | undefined

  valueUtil: DropdownValueUtil

  name: string
  icon: string
  placeholder: string

  multiple: boolean
  chips: boolean
  readonly: boolean
  disabled: boolean
  required: boolean
  loading: boolean
  clearable: boolean
  invalid: boolean

  hasFocus: boolean
  isExpanded: boolean
  isDisabled: boolean
  isFilled: boolean

  inputValue: string
  inputContent?: FunctionalComponent | string

  rawValue: string[]
  value?: string | string[]
  initialValue?: string | string[]
  valueChanged(newValue: string | string[] | undefined, oldValue: string | string[] | undefined)

  panelCleanup?: () => void

  // interfaces to other utils
  toggleList()
  updateRawValueBySelection(newRawValue: string[])

  balChange: EventEmitter<BalEvents.BalDropdownChangeDetail>
}