import { Component, h, ComponentInterface, Host, Element, State, Prop, Watch, Listen } from '@stencil/core'
import { LevelInfo, observeLevels } from './utils/level.utils'
import { BEM } from '../../utils/bem'
import { isPlatform } from '../../utils/platform'

@Component({
  tag: 'bal-navigation',
})
export class Navigation implements ComponentInterface {
  @Element() el!: HTMLElement
  private mutationO?: MutationObserver
  private mainNavElement!: HTMLBalNavigationMainElement
  private previousY = 0
  private scrolling = false

  @State() isTranslated = false
  @State() levels: LevelInfo[] = []
  @State() selectedMetaIndex = 0
  @State() selectedMainIndex = 0
  @State() isMainBodyOpen = false
  @State() isWideOrFullHd = false

  @Prop() logoPath?: string = '/'

  @Prop() metaValue?: string
  @Watch('metaValue')
  metaValueHandler() {
    this.updateIndexes()
  }

  @Prop() mainValue?: string
  @Watch('mainValue')
  mainValueHandler() {
    this.updateIndexes()
  }

  @Listen('click', { target: 'document' })
  clickOnOutside(event: UIEvent) {
    if (!this.mainNavElement.contains(event.target as Node) && this.isMainBodyOpen) {
      this.isMainBodyOpen = false
    }
  }

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.isTranslated = false
    this.isWideOrFullHd = isPlatform('widescreen') || isPlatform('fullhd')
  }

  @Listen('scroll', { target: 'window', passive: true })
  handleScroll() {
    this.scrolling = true
  }

  translateMainNav() {
    this.isTranslated = window.scrollY > this.previousY
    this.previousY = window.scrollY
  }

  async connectedCallback() {
    this.isWideOrFullHd = isPlatform('widescreen') || isPlatform('fullhd')
    await this.readSubLevels()
    this.updateIndexes()
    this.mutationO = observeLevels(this.el, 'bal-navigation-levels', () => this.readSubLevels())
    setInterval(() => {
      if (this.scrolling) {
        this.scrolling = false
        this.translateMainNav()
      }
    }, 300)
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  private updateIndexes() {
    if (this.levels && this.levels.length > 0) {
      const selectedMetaIndex = this.levels.findIndex(meta => meta.value === this.metaValue)
      this.selectedMetaIndex = selectedMetaIndex !== -1 ? selectedMetaIndex : 0

      const selectedMainIndex =
        this.levels[this.selectedMetaIndex].subLevels?.findIndex(main => main.value === this.mainValue) || 0
      this.selectedMainIndex = selectedMainIndex !== -1 ? selectedMainIndex : 0
    }
  }

  private async readSubLevels() {
    const levelEl = this.el.querySelector('bal-navigation-levels')
    const levels = await levelEl?.getLevelInfos()
    if (levels) {
      this.levels = levels
    }
  }

  render() {
    console.log('render navigation', this.selectedMetaIndex, this.selectedMainIndex)
    const navigationEl = BEM.block('nav')
    const selectedMetaLevel = this.levels[this.selectedMetaIndex]
    const selectedMetaValue = selectedMetaLevel.value
    const selectedMainValue = selectedMetaLevel.subLevels
      ? selectedMetaLevel.subLevels[this.selectedMainIndex].value
      : ''

    return (
      <Host
        class={{
          ...navigationEl.class(),
          'bal-nav--translated': this.isTranslated,
        }}
      >
        <bal-navigation-meta class="is-hidden-touch">
          <bal-navigation-meta-start>
            <bal-tabs interface="meta" inverted value={selectedMetaValue}>
              {this.levels.map(meta => (
                // TODO: decide if we need to add the href prop: href={meta.link}
                <bal-tab-item
                  label={meta.label}
                  value={meta.value}
                  onBalNavigate={ev => {
                    meta.onClick(ev.detail)
                    this.metaValue = meta.value
                    this.isMainBodyOpen = false
                  }}
                />
              ))}
            </bal-tabs>
          </bal-navigation-meta-start>
          <bal-navigation-meta-end>
            <slot name="meta-actions" />
          </bal-navigation-meta-end>
        </bal-navigation-meta>

        {/* TODO: Create custom component for main navigation desktop */}
        <bal-navigation-main
          class="is-hidden-touch"
          ref={el => (this.mainNavElement = el as HTMLBalNavigationMainElement)}
        >
          <bal-navigation-main-head
            slot="main-head"
            class={{
              'has-radius-large': this.isWideOrFullHd,
              'is-hidden-mobile has-background-white has-shadow is-block': true,
            }}
          >
            <div class="is-flex is-align-items-center is-flex-wrap-wrap is-justify-content-space-between">
              <div class="is-flex mr-4">
                <a href={this.logoPath} class="bal-nav__main-head-logo py-4">
                  <bal-logo color="blue"></bal-logo>
                </a>
              </div>
              <div class="is-flex">
                <bal-tabs interface="navbar" value={selectedMainValue}>
                  {this.levels[this.selectedMetaIndex].subLevels?.map((main, index) => (
                    <bal-tab-item
                      label={main.label}
                      value={main.value}
                      onBalNavigate={ev => {
                        main.onClick(ev.detail)
                        this.selectedMainIndex = index
                        this.isMainBodyOpen = true
                      }}
                    ></bal-tab-item>
                  ))}
                </bal-tabs>
              </div>
            </div>
          </bal-navigation-main-head>
          <bal-navigation-main-body
            slot="main-body"
            class={{
              'has-background-white has-shadow has-radius py-4': true,
              'is-hidden': !this.isMainBodyOpen,
            }}
          >
            {this.levels
              .filter((_, index) => index === this.selectedMetaIndex)
              .map(meta => (
                <div class="py-4">
                  {meta.subLevels
                    ?.filter((_, mainIndex) => this.selectedMainIndex === mainIndex)
                    .map(main => (
                      <div>
                        <p>{main.linkLabel}</p>
                        <div class="columns is-multiline">
                          {main.subLevels?.map((block, _, list) => (
                            <bal-card
                              class={`column is-${list.length === 1 ? '12' : list.length === 2 ? '6' : '4'}`}
                              color={block.color || 'white'}
                              flat
                              space="small"
                            >
                              <bal-card-content class={`${block.color === 'grey' ? '' : 'px-0'}`}>
                                <h4 class="title is-size-4">{block.label}</h4>
                                {block.subLevels?.map(item => (
                                  <a
                                    class="is-link is-block py-1"
                                    onClick={ev => {
                                      main.onClick(ev)
                                      this.isMainBodyOpen = false
                                    }}
                                  >
                                    {item.label}
                                  </a>
                                ))}
                              </bal-card-content>
                            </bal-card>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </bal-navigation-main-body>
        </bal-navigation-main>

        {/* <hr class="my-8" /> */}

        {/* {this.levels.map(meta => (
          <p>
            {meta.label}
            {meta.subLevels?.map(main => (
              <p class="ml-2">
                {main.label}
                {main.subLevels?.map(block => (
                  <p class="ml-2">
                    {block.label}
                    {block.subLevels?.map(item => (
                      <p class="ml-2">{item.label}</p>
                    ))}
                  </p>
                ))}
              </p>
            ))}
          </p>
        ))} */}
        <slot></slot>
      </Host>
    )
  }
}
