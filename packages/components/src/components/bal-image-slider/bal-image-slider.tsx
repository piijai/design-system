import { Component, h, ComponentInterface, Host, Element, State, Listen } from '@stencil/core'
import { isNil } from 'lodash'
import { BEM } from '../../utils/bem'
import { observeItems } from '../../utils/observer'

@Component({
  tag: 'bal-image-slider',
})
export class ImageSlider implements ComponentInterface {
  @Element() el!: HTMLBalImageSliderElement

  private mutationO?: MutationObserver
  private xPos = 0

  @State() slideIndex = 0
  @State() images!: HTMLBalImageSliderItemElement[]

  connectedCallback() {
    this.mutationO = observeItems(this.el, 'bal-image-slider-item', () => this.updateImages())
    this.updateImages()
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  @Listen('touchstart')
  touchStart(event: TouchEvent) {
    this.xPos = event.touches[0].pageX
  }

  @Listen('touchend')
  touchEnd(event: TouchEvent) {
    if (event.changedTouches[0].pageX < this.xPos) {
      this.setSlide(this.slideIndex + 1)
    } else {
      this.setSlide(this.slideIndex - 1)
    }
  }

  private getChildItems() {
    return Array.from(this.el.querySelectorAll<HTMLBalImageSliderItemElement>('bal-image-slider-item'))
  }

  private getImageContainer() {
    return this.el.querySelector<HTMLDivElement>('.bal-image-slider__container__images')
  }

  private updateImages() {
    this.images = this.getChildItems()
  }

  /**
   * Set the slide to switch to
   * @param {number} slide :Set to switch to.
   */
  private setSlide = (slide: number) => {
    const container = this.getImageContainer()
    const slideWidth = this.images[0].clientWidth
    if (container && slide >= 0 && slide !== this.images.length) {
      this.slideIndex = slide
      container.style.transitionDuration = '1.2s'
      container.style.transitionTimingFunction = 'cubic-bezier(0.23, 0.93, 0.13, 1)'
      container.style.transform = `translate(-${this.slideIndex * slideWidth}px)`
    } else {
      return
    }
  }

  /**
   * Returns the controls for the slider based on the total number of the slides
   * > 5 = number control
   * < 5 = dots control
   */
  private getControls = () => {
    const dot = BEM.block('image-slider').element('controls').element('dots').element('dot')

    if (!isNil(this.images)) {
      if (this.images.length <= 5) {
        const dots = []
        for (let i = 1; i <= this.images.length; i++) {
          const isActive = this.slideIndex + 1 === i
          dots.push(
            <span
              class={{
                ...dot.class(),
                ...dot.modifier('active').class(isActive),
                ...dot.modifier('inactive').class(!isActive),
              }}
              onClick={() => this.setSlide(i - 1)}
            ></span>,
          )
        }
        return dots.map(dot => dot)
      } else {
        return (
          <bal-text space="none" class="is-size-5" color="blue">
            {this.slideIndex + 1 + '/' + this.images.length}
          </bal-text>
        )
      }
    }
  }

  render() {
    const block = BEM.block('image-slider')
    const container = block.element('container')
    const containerImages = container.element('images')
    const controls = block.element('controls')
    const controlNavigation = controls.element('navigation')
    const controlDots = controls.element('dots')

    return (
      <Host class={{ ...block.class() }}>
        <div class={{ ...container.class() }}>
          <div class={{ ...containerImages.class() }}>
            <slot></slot>
          </div>
        </div>
        <div class={{ ...controls.class() }}>
          {
            <bal-button
              class={{ ...controlNavigation.class() }}
              onClick={() => this.setSlide(this.slideIndex - 1)}
              color="link"
              size="small"
              icon="caret-left"
              flat={true}
            />
          }

          <div class={{ ...controlDots.class() }}>{this.getControls()}</div>
          {
            <bal-button
              class={{ ...controlNavigation.class() }}
              onClick={() => this.setSlide(this.slideIndex + 1)}
              color="link"
              size="small"
              icon="caret-right"
              flat={true}
            />
          }
        </div>
      </Host>
    )
  }
}
