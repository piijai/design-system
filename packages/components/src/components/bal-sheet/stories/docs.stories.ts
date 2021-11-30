import docs from './readme.docs.mdx'
import { generateArgType } from '../../../stories/helpers/args'
import { BalSheet } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Sheet',
  component: BalSheet,
  argTypes: generateArgType('bal-sheet'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const Basic = args => ({
  components: { BalSheet },
  setup: () => ({ args }),
  template: `<bal-sheet v-bind="args">
  <div class="is-hidden-desktop">
    <bal-button expanded>Continue with 1'234 CHF</bal-button>
    <bal-button expanded color="link">Back</bal-button>
  </div>
  <div class="is-hidden-touch">
    <div class="columns">
      <div class="column is-flex is-align-items-center is-justify-content-center">
        <h2 class="title is-size-2 has-no-margin has-text-right">1'234 CHF</h2>
      </div>
      <div class="column is-flex is-align-items-center">
        <p class="has-no-margin has-text-blue-light-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="column is-2 is-flex is-align-items-center">
        <bal-button expanded color="link">Back</bal-button>
      </div>
      <div class="column is-2 is-flex is-align-items-center">
        <bal-button expanded>Next</bal-button>
      </div>
    </div>
  </div>
</bal-sheet>`,
})
Basic.args = {}
