import { Component, Host, h, Element, State, Event, EventEmitter, Method, Prop, Watch, Listen } from '@stencil/core'
import { debounceEvent } from '../../helpers/helpers'
import { BalTabOption } from './bal-tab.type'
import { watchForTabs } from './utils/watch-tabs'
import { TabList } from './components/tabs'
import { StepList } from './components/steps'
import { Props } from '../../props'
import { BEM } from '../../utils/bem'
import { isPlatform } from '../../'
import { Platforms } from '../../types'
import { getPlatforms } from '../../'

@Component({
  tag: 'bal-tabs',
})
export class Tabs {
  @Element() el!: HTMLElement

  private didInit = false
  private mutationO?: MutationObserver

  @State() tabsOptions: BalTabOption[] = []
  @State() lineWidth = 0
  @State() lineOffsetLeft = 0
  @State() lineHeight = 0
  @State() lineOffsetTop = 0
  @State() isReady = false
  @State() platform: Platforms[] = ['mobile']

  /**
   * Defines the layout of the tabs.
   */
  @Prop() interface: Props.BalTabsInterface = 'tabs'

  /**
   * Defines the layout of the tabs.
   */
  @Prop() iconPosition: Props.BalTabsIconPosition = 'horizontal'

  /**
   * If `true` the field expands over the whole width.
   */
  @Prop() expanded = false

  /**
   * If `true` the tabs is a block element and uses 100% of the width
   */
  @Prop() fullwidth = false

  /**
   * If `true` the tabs or steps can be clicked.
   */
  @Prop() clickable = true

  /**
   * If `true` a light border is shown for the tabs.
   */
  @Prop() border = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  /**
   * If `true` tabs are align vertically.
   */
  @Prop() vertical = false

  /**
   * If `true` tabs are align vertically on the mobile.
   */
  @Prop() verticalOnMobile = false

  /**
   * If `true` the tabs are shown as a select component on mobile
   */
  @Prop() selectOnMobile = false

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  @Prop({ mutable: true }) value?: string = undefined

  @Watch('value')
  protected async valueChanged(newValue?: string, oldValue?: string) {
    this.tabs.forEach(t => t.setActive(t.value === this.value))

    if (this.didInit && newValue !== oldValue) {
      this.isReady = true
    }
  }

  /**
   * Emitted when the changes has finished.
   */
  @Event({ eventName: 'balChange' }) balChange!: EventEmitter<string>

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.platform = getPlatforms()
    this.moveLine(this.getTargetElement(this.value))
  }

  connectedCallback() {
    this.platform = getPlatforms()
    this.debounceChanged()
    this.updateTabs()

    this.mutationO = watchForTabs<HTMLBalTabItemElement>(this.el, 'bal-tab-item', () => {
      this.updateTabs()
    })
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  componentDidLoad() {
    this.didInit = true
    let value = this.value
    if (value === undefined || value === '') {
      const availableTabs = this.tabsOptions.filter(t => !t.disabled)
      if (availableTabs.length > 0) {
        value = availableTabs[0].value
      }
    }

    this.value = value
    this.valueChanged(value, this.value)
  }

  componentDidRender() {
    this.moveLine(this.getTargetElement(this.value))
  }

  /**
   * Go to tab with the given value
   */
  @Method()
  async select(tab: BalTabOption) {
    this.value = tab.value
  }

  private get tabs(): HTMLBalTabItemElement[] {
    return Array.from(this.el.querySelectorAll('bal-tab-item'))
  }

  private async updateTabs() {
    await Promise.all(this.tabs.map(value => value.getOptions())).then(tabsOptions => {
      this.tabsOptions = tabsOptions
    })
    const activeTabs = this.tabsOptions.filter(t => t.active)
    if (activeTabs.length > 0) {
      const firstActiveTab = activeTabs[0]
      this.value = firstActiveTab.value
    }
  }

  // private async onSelectTab(event: MouseEvent, tab: BalTabOption) {
  private async onSelectTab(event: MouseEvent | CustomEvent, tab: BalTabOption) {
    if (tab.prevent || tab.disabled || !this.clickable) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (!tab.disabled) {
      tab.navigate.emit(event)
      if (this.clickable) {
        await this.select(tab)
        if (tab.value !== this.value) {
          this.balChange.emit(tab.value)
        }
      }
    }
  }

  private moveLine(element: HTMLElement) {
    setTimeout(() => {
      if (this.interface === 'tabs' || this.interface === 'tabs-sub') {
        if (element) {
          const listElement = element.closest('li')

          if (this.vertical || (isPlatform('mobile') && this.verticalOnMobile)) {
            if (listElement?.clientHeight !== undefined) {
              this.lineHeight = listElement.clientHeight - 16
            }

            if (listElement?.offsetTop !== undefined) {
              this.lineOffsetTop = listElement.offsetTop + 8
            }
          } else {
            if (listElement?.clientWidth !== undefined) {
              this.lineWidth = listElement.clientWidth - 32
            }

            if (listElement?.offsetLeft !== undefined) {
              this.lineOffsetLeft = listElement.offsetLeft + 16
            }
          }
        }
      }
    }, 0)
  }

  private getTargetElement(value?: string) {
    const elements = Array.from(this.el.querySelectorAll('.data-test-tab-item')) as HTMLElement[]
    return elements.filter(element => element.getAttribute('data-value') == value)[0]
  }

  private isTabActive(tab: BalTabOption): boolean {
    return tab.value === this.value
  }

  render() {
    const block = BEM.block('tabs')
    const isSteps = this.interface === 'steps' || this.interface === 'o-steps'
    const Tabs = isSteps ? StepList : TabList

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('fullwidth').class(this.expanded || this.fullwidth || isSteps),
          // 'bal-tabs': this.interface === 'tabs' || this.interface === 'tabs-sub' || this.interface === 'navbar',
          // 'bal-steps': this.interface === 'steps',
          // 'bal-o-steps': this.interface === 'o-steps',
          // 'is-sub-navigation': this.interface === 'tabs-sub',
          // 'is-navbar-tabs': this.interface === 'navbar',
          // 'is-vertical': this.vertical,
          // 'is-vertical-on-mobile': this.verticalOnMobile,
        }}
        data-value={this.tabsOptions
          .filter(t => this.isTabActive(t))
          .map(t => t.value)
          .join(',')}
        data-label={this.tabsOptions
          .filter(t => this.isTabActive(t))
          .map(t => t.label)
          .join(',')}
      >
        <Tabs
          value={this.value}
          tabs={this.tabsOptions}
          border={this.border}
          expanded={this.expanded}
          clickable={this.clickable}
          isReady={this.isReady}
          iconPosition={this.iconPosition}
          // action={this.action}
          // actionLabel={this.actionLabel}
          // onActionClick={e => this.actionHasClicked.emit(e)}
          onSelectTab={(e, t) => this.onSelectTab(e, t)}
          lineWidth={this.lineWidth}
          lineOffsetLeft={this.lineOffsetLeft}
          lineHeight={this.lineHeight}
          lineOffsetTop={this.lineOffsetTop}
          vertical={this.vertical}
          verticalOnMobile={this.verticalOnMobile}
          selectOnMobile={this.selectOnMobile}
        ></Tabs>
        <slot></slot>
      </Host>
    )
  }
}
