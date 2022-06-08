import { FunctionalComponent, h } from '@stencil/core'
import { isPlatform } from '../../../'
import { BEM } from '../../../utils/bem'
import { TabProps, TabLineProps } from '../bal-tab.type'
import { TabItem } from './tab-item'

const tabsEl = BEM.block('tabs').element('tabs')
const tabItemEl = tabsEl.element('item')

export const TabList: FunctionalComponent<TabProps> = ({
  value,
  expanded,
  border,
  tabs,
  onSelectTab,
  isReady,
  iconPosition,
  lineWidth,
  lineOffsetLeft,
  lineHeight,
  lineOffsetTop,
  vertical,
  verticalOnMobile,
  selectOnMobile,
}) => {
  if (isPlatform('mobile') && selectOnMobile) {
    const onChange = (event: CustomEvent<string | string[] | undefined>) => {
      const selectedTabs = tabs.filter(tab => tab.value === event.detail)
      if (selectedTabs.length > 0) {
        onSelectTab(event, selectedTabs[0])
      }
    }
    return (
      <bal-select value={value} onBalChange={event => onChange(event)}>
        {tabs.map(tab => (
          <bal-select-option label={tab.label} value={tab.value}>
            {tab.label}
          </bal-select-option>
        ))}
      </bal-select>
    )
  }

  return (
    <div
      class={{
        ...tabsEl.class(),
        ...tabsEl.modifier('vertical').class(vertical),
        ...tabsEl.modifier('vertical-on-mobile').class(verticalOnMobile),
      }}
    >
      <ul>
        {tabs.map((tab, index) => (
          <li
            class={{
              ...tabItemEl.class(),
              ...tabItemEl.modifier('active').class(tab.value === value),
              ...tabItemEl.modifier('disabled').class(tab.disabled),
              ...tabItemEl.modifier('fullwidth').class(expanded),
              ...tabItemEl.modifier('vertical').class(vertical),
              ...tabItemEl.modifier('vertical-on-mobile').class(verticalOnMobile),
              'data-test-tab-item': true,
            }}
            data-label={tab.label}
            data-value={tab.value}
            data-index={index}
          >
            <TabItem
              icon={tab.icon}
              vertical={vertical}
              verticalOnMobile={verticalOnMobile}
              expanded={expanded}
              iconPosition={iconPosition}
              disabled={tab.disabled}
              href={tab.href}
              label={tab.label}
              bubble={tab.bubble}
              onSelectTab={e => onSelectTab(e, tab)}
            ></TabItem>
            {/* <bal-badge size="small" position="tabs" class={{ 'is-hidden': !tab.hasBubble }}></bal-badge> */}
          </li>
        ))}
      </ul>
      <div
        class={{
          ...tabsEl.element('border').class(),
          ...tabsEl.element('border').modifier('vertical').class(vertical),
          ...tabsEl.element('border').modifier('vertical-on-mobile').class(verticalOnMobile),
        }}
        style={{ display: border ? 'block' : 'none' }}
      ></div>
      <TabLine
        vertical={vertical}
        verticalOnMobile={verticalOnMobile}
        lineOffsetLeft={lineOffsetLeft}
        lineWidth={lineWidth}
        lineOffsetTop={lineOffsetTop}
        lineHeight={lineHeight}
        isReady={isReady}
      ></TabLine>
    </div>
  )
}

export const TabLine: FunctionalComponent<TabLineProps> = ({
  vertical,
  verticalOnMobile,
  isReady,
  lineWidth,
  lineOffsetLeft,
  lineHeight,
  lineOffsetTop,
}) => {
  const tabLineEl = tabsEl.element('line')
  let style = {}
  if (vertical || (isPlatform('mobile') && verticalOnMobile)) {
    style = {
      top: `${lineOffsetTop || 0}px`,
      height: `${lineHeight || 0}px`,
    }
  } else {
    style = {
      left: `${lineOffsetLeft || 0}px`,
      width: `${lineWidth || 0}px`,
    }
  }

  return (
    <div
      class={{
        ...tabLineEl.class(),
        ...tabLineEl.modifier('ready').class(isReady),
        ...tabLineEl.modifier('vertical').class(vertical),
        ...tabLineEl.modifier('vertical-on-mobile').class(verticalOnMobile),
      }}
      style={style}
      // style={{ display: vertical ? 'none' : 'block', left: `${lineOffsetLeft || 0}px`, width: `${lineWidth || 0}px` }}
    ></div>
  )
}
