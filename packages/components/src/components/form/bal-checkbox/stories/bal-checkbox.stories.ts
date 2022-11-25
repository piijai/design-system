import docs from './bal-checkbox.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import {
  BalCheckbox,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
  BalCheckboxGroup,
} from '../../../../../.storybook/vue/components'
import { isDescendant } from '../../../../../dist'
import { ref, unref } from 'vue'

const balFieldArgTypes = stencilArgType(BalField)
const balCheckboxGroupArgTypes = stencilArgType(BalCheckboxGroup)

const component = BalComponentStory({
  title: 'Components/Form/Checkbox',
  component: BalCheckbox,
  subcomponents: { BalCheckboxGroup },
  docs,
  argTypes: {
    ...balCheckboxGroupArgTypes,
    invalid: balFieldArgTypes.invalid,
    hasFieldMessage: {
      description: 'Show a hint or validation message below the control',
      table: {
        category: 'custom',
      },
    },
  },
  args: {
    invalid: false,
    vertical: false,
    hasFieldMessage: true,
  },
})

export default component.story

const excludedControls = ['name', 'hidden']

export const Basic = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `
  <bal-checkbox v-bind="args" v-model="args.value">{{ args.content }}</bal-checkbox>`,
})
Basic.args = {
  content: 'Label',
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

const FieldTemplate = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :inverted="args.inverted" :invalid="args.invalid">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-checkbox-group>
        <bal-checkbox v-bind="args" v-model="args.value">
          Label
        </bal-checkbox>
      </bal-checkbox-group>
    </bal-field-control>
    <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
  </bal-field>`,
})

const GroupTemplate = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :inverted="args.inverted" :invalid="args.invalid">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-checkbox-group v-bind="args" v-model="args.value">
        <bal-checkbox :value="1">
          Apple
        </bal-checkbox>
        <bal-checkbox :value="2">
          Pineapple
        </bal-checkbox>
        <bal-checkbox :value="3">
          Orange
        </bal-checkbox>
      </bal-checkbox-group>
    </bal-field-control>
    <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
  </bal-field>`,
})

const Template = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :inverted="args.inverted" :invalid="args.invalid">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-checkbox-group :vertical="args.vertical" v-bind="args">
        <bal-checkbox checked="args.checked">
          Label
        </bal-checkbox>
        <bal-checkbox>
          Label
        </bal-checkbox>
        <bal-checkbox>
         Label
        </bal-checkbox>
      </bal-checkbox-group>
    </bal-field-control>
    <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
  </bal-field>`,
})

const Filter = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :inverted="args.inverted" :invalid="args.invalid">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-checkbox-group :vertical="args.vertical" v-bind="args">
        <bal-checkbox checked="args.checked">
          Label
        </bal-checkbox>
        <bal-checkbox>
          Label
        </bal-checkbox>
        <bal-checkbox>
          Random text with a <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> in it
        </bal-checkbox>
      </bal-checkbox-group>
    </bal-field-control>
    <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
  </bal-field>`,
})

export const FieldControl = FieldTemplate.bind({})
FieldControl.args = {
  content: 'Label',
}
FieldControl.parameters = {
  ...component.sourceCode(FieldControl),
  controls: { exclude: excludedControls },
}

export const Group = GroupTemplate.bind({})
Group.args = {
  value: [2],
  control: true,
}
Group.parameters = {
  ...component.sourceCode(Group),
  controls: { exclude: excludedControls },
}

export const Vertical = Template.bind({})
Vertical.args = {
  content: 'Label',
  vertical: true,
}
Vertical.parameters = {
  ...component.sourceCode(Vertical),
  controls: { exclude: excludedControls },
}

export const FilterButtons = Filter.bind({})
FilterButtons.args = {
  content: 'Label',
  interface: 'select-button',
}
FilterButtons.parameters = {
  ...component.sourceCode(FilterButtons),
  controls: { exclude: excludedControls },
}

export const Switch = FieldTemplate.bind({})
Switch.args = {
  content: 'Label',
  interface: 'switch',
}
Switch.parameters = {
  ...component.sourceCode(Switch),
  controls: { exclude: excludedControls },
}

export const Box = args => ({
  components: { ...component.components },
  setup: () => {
    const elementA = ref(null)
    const elementB = ref(null)
    const selectedA = ref(true)
    const selectedB = ref(false)

    const checkA = event => {
      if (!isDescendant(unref(elementA).$el, event.target)) {
        selectedA.value = !selectedA.value
      }
    }

    const checkB = event => {
      if (!isDescendant(unref(elementB).$el, event.target)) {
        selectedB.value = !selectedB.value
      }
    }

    return {
      args,
      selectedA,
      selectedB,
      elementA,
      elementB,
      checkA,
      checkB,
    }
  },
  template: `
  <div class="columns" style="max-width: 400px">
    <div class="column">
      <div @click="checkA($event)" :class="selectedA ? 'has-background-blue-light':''" class="clickable is-flex px-4 py-2 is-flex-direction-column is-justify-content-center is-align-items-center has-border-blue has-radius-normal">
        <img src="https://www.baloise.ch/dam/jcr:5d0376a5-53ef-40b9-a1d9-c6d7d0c56bf7/Haushalt.svg" >
        <p class="has-text-blue is-bold mb-0">Title</p>
        <p class="has-text-blue mb-3">Subtitle</p>
        <p class="has-text-blue-light-text is-size-6 mb-4">More Description</p>
        <bal-checkbox ref="elementA" class="mb-3" v-bind="args" v-model="selectedA"></bal-checkbox>
      </div>
    </div>
    <div class="column">
    <div @click="checkB($event)" :class="selectedB ? 'has-background-blue-light':''" class="clickable is-flex px-4 py-2 is-flex-direction-column is-justify-content-center is-align-items-center has-border-blue has-radius-normal">
      <img src="https://www.baloise.ch/dam/jcr:5d0376a5-53ef-40b9-a1d9-c6d7d0c56bf7/Haushalt.svg" >
      <p class="has-text-blue is-bold mb-0">Title</p>
      <p class="has-text-blue mb-3">Subtitle</p>
      <p class="has-text-blue-light-text is-size-6 mb-4">More Description</p>
      <bal-checkbox ref="elementB" class="mb-3" v-bind="args" v-model="selectedB"></bal-checkbox>
    </div>
  </div>
  </div>`,
})
Box.args = {}
Box.parameters = {
  ...component.sourceCode(Box),
  controls: {
    exclude: [...excludedControls, 'interface', 'invalid', 'value', 'hasFieldMessage', 'inverted', 'value', 'content'],
  },
}
