import { fileURLToPath } from 'url'
import path from 'path'
import get from 'lodash.get'
import { writeFile, readFile } from '../../../scripts/utils.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')
const __tokens = path.join(__dirname, '..', 'tokens/dist')
const __visual_tests = path.join(__dirname, '..', 'components/src/test/utils')

export const NEWLINE = '\n'
export const DASH_SEPARATOR = '-'
export const COLON_SEPARATOR = `\\:`
export const pseudoStates = ['focus', 'hover', 'active']
export const minBreakpoints = ['mobile', 'tablet', 'desktop', 'widescreen']

export const allBreakpoints = [
  'mobile',
  'tablet',
  'tablet-only',
  'touch',
  'desktop',
  'desktop-only',
  'high-definition',
  'high-definition-only',
  'widescreen',
  'widescreen-only',
  'fullhd',
]

class RuleValue {
  constructor({ prop, value, important = false }) {
    this.prop = prop
    this.value = value
    this.important = important
  }

  toString(indent = '') {
    return `${indent}${this.prop}: ${this.value}${this.important === true ? ' !important' : ''}`
  }
}

class Rule {
  values = []

  constructor({ selectors }) {
    function onlyUnique(value, index, array) {
      return array.indexOf(value) === index
    }

    this.selectors = selectors.filter(s => s !== '').filter(onlyUnique)
  }

  append(opts) {
    this.values.push(new RuleValue(opts))
  }

  toString(indent = '') {
    const selector = this.selectors.map(s => `${indent}${s}`).join(`,${NEWLINE}`)
    const values = this.values.map(value => {
      return [`  ${value.toString(indent)}`].join(NEWLINE)
    })
    return [selector, ...values].join(NEWLINE) + NEWLINE
  }
}

class BreakpointRule {
  rules = []

  constructor({ breakpoint }) {
    this.breakpoint = breakpoint
  }

  append(rule) {
    this.rules.push(rule)
  }

  toString(indent = '') {
    return [
      indent + `+${this.breakpoint}`,
      indent + this.rules.map(rule => rule.toString(`  ${indent}`)).join(NEWLINE),
    ].join(`${NEWLINE}`)
  }
}

class RuleGroup {
  rules = []

  append(rule) {
    this.rules.push(rule)
  }

  toString(indent = '') {
    return this.rules.map(rule => rule.toString(indent)).join(NEWLINE)
  }
}

export const jsonClass = ({ property = '', values = {} }) => {
  const keys = Object.keys(values)
  return {
    [property]: keys.map(key => {
      return {
        class: key,
        properties: `${property}: ${values[key]};`,
      }
    }),
  }
}

export const getTokens = async ({ token, deprecated }) => {
  const content = await readFile(path.join(__tokens, `${deprecated ? 'deprecated/' : ''}tokens.docs.json`))
  const json = JSON.parse(content)
  return get(json, token)
}

export const filterTokenKeys = ({ tokens, ignore = [] }) => {
  return Object.keys(tokens).filter(key => !ignore.includes(key))
}

export const visualTest = ({ values, template }) => {
  const lines = []
  for (const className in values) {
    lines.push(template(className))
  }
  return lines.map(l => `        ${l}`).join(NEWLINE)
}

export const toCssVarName = (tokenName, token) => {
  const isSizeVariable = token.attributes.category === 'size'
  const isColorVariable = token.attributes.category === 'color'
  const endsWithMobile = token.name.endsWith('-mobile') || token.name.endsWith('Mobile')
  const endsWithDefault = token.name.endsWith('-default') || token.name.endsWith('Default')

  if (isSizeVariable) {
    tokenName = tokenName.replace('bal-size', 'bal')
  }
  if (isColorVariable) {
    tokenName = tokenName.replace('bal-color-base', 'bal-color')
  }
  if (endsWithMobile) {
    tokenName = tokenName.replace('-mobile', '')
  }
  if (endsWithDefault && !isFigma) {
    tokenName = tokenName.replace('-default', '')
  }
  return tokenName
}

export const toCssVar = token => {
  const originalValue = token.original.value

  if (originalValue.startsWith('{')) {
    const formattedOriginalValue = originalValue.slice(1, -1)
    return `var(--${toCssVarName(`bal-${formattedOriginalValue.split('.').join('-')}`, token)})`
  }

  return `var(--${toCssVarName(token.name, token)})`
}

export const toProp = ({ property, prefix, replace }) => {
  const propPrefix = `${prefix ? prefix + '-' : ''}`
  const propName = `${propPrefix}${property.name.replace('bal-', '')}`.replace(replace, '').replace('--', '-')
  const propValue = toCssVar(property)
  return {
    [`${propName}`]: propValue,
  }
}

export const toProps = ({ tokens, prefix, replace }) => {
  let props = {}
  for (const key in tokens) {
    const property = tokens[key]

    if (!property.value) {
      props = {
        ...props,
        ...toProps({ tokens: property, prefix, replace }),
      }
    } else {
      props = {
        ...props,
        ...toProp({ property, prefix, replace }),
      }
    }
  }
  return props
}

export const styleClass = ({
  property = '',
  values = {},
  important = false,
  responsive = false,
  states = false,
  breakpoints = minBreakpoints,
  additionalValues = {},
  breakpoint = '',
}) => {
  const propNames = Array.isArray(property) ? property : [property]
  const rules = new RuleGroup()

  if (breakpoint) {
    let breakpointRule = new BreakpointRule({ breakpoint })
    for (const className in values) {
      let rule = new Rule({
        selectors: [`.${className}`],
      })
      propNames.forEach(prop => {
        rule.append({ prop, value: values[className], important })
        if (additionalValues) {
          for (const additionalValue in additionalValues) {
            rule.append({ prop: additionalValue, value: additionalValues[additionalValue] })
          }
        }
      })
      rules.append(rule)
    }
    breakpointRule.append(rules)
    return breakpointRule
  } else {
    for (const className in values) {
      let rule = new Rule({
        selectors: [`.${className}`],
      })
      propNames.forEach(prop => {
        rule.append({ prop, value: values[className], important })
        if (additionalValues) {
          for (const additionalValue in additionalValues) {
            rule.append({ prop: additionalValue, value: additionalValues[additionalValue] })
          }
        }
      })
      rules.append(rule)
    }

    if (states) {
      for (const className in values) {
        for (const pseudo_state of pseudoStates) {
          let rule = new Rule({
            selectors: [`.${pseudo_state}${COLON_SEPARATOR}${className}:${pseudo_state}`],
          })
          propNames.forEach(prop => {
            rule.append({ prop, value: values[className], important })
            if (additionalValues) {
              for (const additionalValue in additionalValues) {
                rule.append({ prop: additionalValue, value: additionalValues[additionalValue] })
              }
            }
          })
          rules.append(rule)
        }
      }
    }

    if (responsive) {
      for (const breakpoint of breakpoints) {
        let breakpointRule = new BreakpointRule({ breakpoint })
        for (const className in values) {
          let rule = new Rule({
            selectors: [`.${breakpoint}${COLON_SEPARATOR}${className}`],
          })
          propNames.forEach(prop => {
            rule.append({ prop, value: values[className], important })
            if (additionalValues) {
              for (const additionalValue in additionalValues) {
                rule.append({ prop: additionalValue, value: additionalValues[additionalValue] })
              }
            }
          })
          breakpointRule.append(rule)
        }

        if (states) {
          for (const className in values) {
            for (const pseudo_state of pseudoStates) {
              let rule = new Rule({
                selectors: [
                  `.${breakpoint}${COLON_SEPARATOR}${pseudo_state}${COLON_SEPARATOR}${className}:${pseudo_state}`,
                ],
              })
              propNames.forEach(prop => {
                rule.append({ prop, value: values[className], important })
                if (additionalValues) {
                  for (const additionalValue in additionalValues) {
                    rule.append({ prop: additionalValue, value: additionalValues[additionalValue] })
                  }
                }
              })
              breakpointRule.append(rule)
            }
          }
        }

        rules.append(breakpointRule)
      }
    }
  }

  return rules
}

export const styleClassDeprecated = ({
  property = '',
  values = {},
  important = false,
  responsive = false,
  breakpoints = minBreakpoints,
  prefix = '',
}) => {
  const propNames = Array.isArray(property) ? property : [property]
  const rules = new RuleGroup()

  for (const className in values) {
    const selectors = [prefix !== '' ? `.${[prefix, className].join(DASH_SEPARATOR)}` : className]
    let rule = new Rule({ selectors })
    propNames.forEach(prop => rule.append({ prop, value: values[className], important }))
    rules.append(rule)
  }

  if (responsive) {
    for (const breakpoint of breakpoints) {
      let breakpointRule = new BreakpointRule({ breakpoint })
      for (const className in values) {
        const selectors = [prefix !== '' ? `.${[prefix, className, breakpoint].join(DASH_SEPARATOR)}` : className]
        let rule = new Rule({ selectors })
        propNames.forEach(prop => rule.append({ prop, value: values[className], important }))
        breakpointRule.append(rule)
      }

      rules.append(breakpointRule)
    }
  }

  return rules
}

export const merge = ({ docs = [], rules = [], deprecated = [], visualTest = [] }) => {
  return {
    json: JSON.stringify(docs, undefined, 2),
    rules: [...rules.map(r => r.toString())].join(NEWLINE),
    deprecated: [...deprecated.map(r => r.toString())].join(NEWLINE),
    visualTest: `<!DOCTYPE html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <script type="module" src="/build/design-system-components.esm.js"></script>
    <script nomodule src="/build/design-system-components.js"></script>
  </head>
  <body>
    <bal-doc-app>
      <main class="container">
${visualTest.join(NEWLINE)}
      </main>
    </bal-doc-app>
  </body>
</html>
    `,
  }
}

export const save = async (fileName, { json, rules, deprecated, visualTest }) => {
  await writeFile(path.join(__dirname, 'docs', `${fileName}.json`), json)
  await writeFile(path.join(__dirname, 'src/generated', `${fileName}.sass`), rules)
  await writeFile(path.join(__dirname, 'src/generated/deprecated', `${fileName}.sass`), deprecated)
  await writeFile(path.join(__visual_tests, `${fileName}.html`), visualTest)
}
