import docs from './bal-icon.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalIcon } from '../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  component: BalIcon,
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-icon v-bind="args"></bal-icon>`,
})

export const Basic = Template.bind({})
Basic.args = {
  name: 'info-circle',
  size: 'large',
  color: 'primary',
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const SVG = args => ({
  components: { ...component.components },
  setup: () => {
    const autoSvg = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_403_16317)">
    <path d="M29 30.2143H35.4286V34.0714C35.4286 34.4124 35.2931 34.7395 35.052 34.9806C34.8109 35.2217 34.4838 35.3572 34.1429 35.3572H30.2857C29.9447 35.3572 29.6177 35.2217 29.3766 34.9806C29.1355 34.7395 29 34.4124 29 34.0714V30.2143Z" fill="#000D6E"/>
    <path d="M4.57153 30.2143H11.0001V34.0714C11.0001 34.4124 10.8646 34.7395 10.6235 34.9806C10.3824 35.2217 10.0554 35.3572 9.71439 35.3572H5.85725C5.51625 35.3572 5.18923 35.2217 4.94811 34.9806C4.70699 34.7395 4.57153 34.4124 4.57153 34.0714V30.2143Z" fill="#000D6E"/>
    <path d="M37.3571 12.2143H34.7857C34.4306 12.2143 34.1428 12.5021 34.1428 12.8572V14.1429C34.1428 14.4979 34.4306 14.7857 34.7857 14.7857H37.3571C37.7121 14.7857 38 14.4979 38 14.1429V12.8572C38 12.5021 37.7121 12.2143 37.3571 12.2143Z" fill="#1B5951"/>
    <path d="M5.21429 12.2143H2.64286C2.28782 12.2143 2 12.5021 2 12.8572V14.1429C2 14.4979 2.28782 14.7857 2.64286 14.7857H5.21429C5.56933 14.7857 5.85714 14.4979 5.85714 14.1429V12.8572C5.85714 12.5021 5.56933 12.2143 5.21429 12.2143Z" fill="#1B5951"/>
    <path d="M35.0301 19.9286L33.7444 16.0714H6.28154L4.99582 19.9286C4.72087 20.5527 4.57648 21.2265 4.57153 21.9086V28.9286H35.4287V21.9086C35.4319 21.2283 35.2962 20.5546 35.0301 19.9286ZM9.07153 25.0714C8.56004 25.0714 8.0695 24.8682 7.70783 24.5065C7.34615 24.1449 7.14296 23.6543 7.14296 23.1428C7.14296 22.6314 7.34615 22.1408 7.70783 21.7791C8.0695 21.4175 8.56004 21.2143 9.07153 21.2143C9.58302 21.2143 10.0736 21.4175 10.4352 21.7791C10.7969 22.1408 11.0001 22.6314 11.0001 23.1428C11.0001 23.6543 10.7969 24.1449 10.4352 24.5065C10.0736 24.8682 9.58302 25.0714 9.07153 25.0714ZM30.9287 25.0714C30.4172 25.0714 29.9266 24.8682 29.565 24.5065C29.2033 24.1449 29.0001 23.6543 29.0001 23.1428C29.0001 22.6314 29.2033 22.1408 29.565 21.7791C29.9266 21.4175 30.4172 21.2143 30.9287 21.2143C31.4402 21.2143 31.9307 21.4175 32.2924 21.7791C32.6541 22.1408 32.8573 22.6314 32.8573 23.1428C32.8573 23.6543 32.6541 24.1449 32.2924 24.5065C31.9307 24.8682 31.4402 25.0714 30.9287 25.0714Z" fill="#1B5951"/>
    <path d="M29.9899 6.87857C29.6978 6.17457 29.2035 5.57292 28.5697 5.14959C27.9358 4.72625 27.1907 4.50021 26.4285 4.5H13.5714C12.8091 4.50021 12.0641 4.72625 11.4302 5.14959C10.7963 5.57292 10.3021 6.17457 10.0099 6.87857L6.71851 14.7857H33.2814L29.9899 6.87857Z" fill="#94E3D4"/>
    </g>
    <defs>
    <clipPath id="clip0_403_16317">
    <rect width="36" height="30.8571" fill="white" transform="translate(2 4.5)"/>
    </clipPath>
    </defs>
    </svg>`

    args.svg = autoSvg

    return {
      args,
      autoSvg,
    }
  },
  template: `<bal-icon v-bind="args"></bal-icon>`,
})
SVG.args = {
  size: 'x-large',
  color: 'auto',
}
SVG.parameters = { ...component.sourceCode(SVG) }
// export const SVG = Template.bind({})
// SVG.parameters = { ...component.sourceCode(SVG) }

export const Sizes = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div>
  <bal-icon name="date" size="x-small"></bal-icon>
  <bal-icon name="date" size="small"></bal-icon>
  <bal-icon name="date"></bal-icon>
  <bal-icon name="date" size="medium"></bal-icon>
  <bal-icon name="date" size="large"></bal-icon>
  <bal-icon name="date" size="x-large"></bal-icon>
  <bal-icon name="date" size="xx-large"></bal-icon>
</div>`,
})
Sizes.parameters = { ...component.sourceCode(Sizes) }

export const Colors = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div>
  <bal-icon color="primary" name="github"></bal-icon>
  <bal-icon color="grey" name="github"></bal-icon>
  <bal-icon color="success" name="github"></bal-icon>
  <bal-icon color="warning" name="github"></bal-icon>
  <bal-icon color="danger" name="github"></bal-icon>
</div>`,
})
Colors.parameters = { ...component.sourceCode(Colors) }
