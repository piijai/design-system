import docs from './bal-stage.docs.mdx'
import { BalComponentStory, withContent } from '../../../stories/utils'
import { BalStage } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Stage',
  component: BalStage,
  argTypes: {
    ...withContent(),
  },
  docs,
})

export default component.story

const excludedControls = ['hasShape']

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-5">Back</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">{{ args.content }}</bal-heading>
    </bal-stage-body>
</bal-stage>`,
})
Basic.args = {
  content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae',
  size: '',
  color: 'green',
  shape: true,
}
Basic.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

export const SimpleStage = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-5">Back</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">{{ args.content }}</bal-heading>
    </bal-stage-body>
</bal-stage>`,
})
SimpleStage.args = {
  content: 'Small title',
  size: 'small',
  color: 'purple',
  shape: true,
}
SimpleStage.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(SimpleStage),
  controls: { exclude: excludedControls },
}

export const LargeStage = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-5">Back</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">{{ args.content }}</bal-heading>
    <bal-heading space="none" subtitle level="h2" visual-level="h1">Additional Subheadline</bal-heading>
    </bal-stage-body>
</bal-stage>`,
})
LargeStage.args = {
  content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae',
  size: 'large',
  color: 'red',
  shape: true,
}
LargeStage.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(LargeStage),
  controls: { exclude: excludedControls },
}

export const StageWithImage = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stage v-bind="args">
  <bal-stage-image src-set="https://via.placeholder.com/768x250 768w, https://via.placeholder.com/1536x500 1536w, https://via.placeholder.com/1023x300 1023w, https://www.baloise.ch/.imaging/mte/baloise-theme/1920/dam/baloise-ch/magazin/privatkunden/header/fahrzeuge-reisen/Skipass-versichern.jpg/jcr:content/Skipass%20versichern.jpg 2400w"></bal-stage-image>
  <bal-stage-body>
    <bal-stage-back-link href="#" class="mb-5">Back</bal-stage-back-link>
    <bal-heading class="mb-2" space="none">{{ args.content }}</bal-heading>
    <bal-heading space="none" subtitle level="h2" visual-level="h1">Additional Subheadline</bal-heading>
  </bal-stage-body>
</bal-stage>`,
})
StageWithImage.args = {
  content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae',
}
StageWithImage.parameters = {
  layout: 'fullscreen',
  ...component.sourceCode(StageWithImage),
  controls: { exclude: excludedControls },
}
