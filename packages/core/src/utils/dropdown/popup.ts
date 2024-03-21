import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom'
import { DropdownComponent } from './component'

export class DropdownPopupUtil {
  private component!: DropdownComponent

  connectedCallback(component: DropdownComponent) {
    this.component = component
  }

  updatePanelPosition = (referenceEl: HTMLElement, floatingEl: HTMLElement) => () => {
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

  toggleList() {
    if (!this.component.isDisabled) {
      if (this.component.isExpanded) {
        this.collapseList()
      } else {
        this.expandList()
      }
    }
  }

  expandList() {
    if (this.component.panelEl) {
      this.component.panelCleanup = autoUpdate(
        this.component.el,
        this.component.panelEl,
        this.updatePanelPosition(this.component.el, this.component.panelEl),
      )
    }
    this.component.isExpanded = true
    this.component.listEl?.focusFirst()
  }

  collapseList() {
    this.component.isExpanded = false
    this.component.listEl?.resetFocus()
    if (this.component.panelCleanup) {
      this.component.panelCleanup()
    }
  }
}
