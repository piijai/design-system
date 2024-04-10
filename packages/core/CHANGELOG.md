# Changelog

## 16.0.4

### Patch Changes

- **react**: adjust released packages with rollup ( [#1371](https://github.com/baloise/design-system/pull/1371))

- **date**: change cutoff year to 10 years in the future. 34 will become 2034 and 35 will become 1935. ( [#1364](https://github.com/baloise/design-system/pull/1364))

## 16.0.3

### Patch Changes

- **maps**: include type declarations ( [#1362](https://github.com/baloise/design-system/pull/1362))

- **brand-icons**: include type declarations ( [#1362](https://github.com/baloise/design-system/pull/1362))

- **icon**: include type declarations ( [#1362](https://github.com/baloise/design-system/pull/1362))

## 16.0.2

### Patch Changes

- **css**: support new grid class names like `grid` and `col` ( [#1361](https://github.com/baloise/design-system/pull/1361))

- **styles**: fix paths in the migration script for windows ( [#1361](https://github.com/baloise/design-system/pull/1361))

- **devkit**: fix build issue of ng-add schematics ( [#1361](https://github.com/baloise/design-system/pull/1361))

- **styles**: add migration for compact theme ( [#1359](https://github.com/baloise/design-system/pull/1359))

## 16.0.1

### Patch Changes

- **testing**: fix import paths ( [#1346](https://github.com/baloise/design-system/pull/1346))

- **core**: adjust interface reference paths ( [#1348](https://github.com/baloise/design-system/pull/1348))

## 16.0.0

### Major Changes

- **all**: Simplifying our package names from `@baloise/design-system-*` to `@baloise/ds-*` ( [#1344](https://github.com/baloise/design-system/pull/1344))

  Please check out the more detailed [Upgrade Guide to v16](https://design.baloise.dev/?path=/docs/development-upgrade-guides-updating-to-v16--documentation).

  | Old Package Name                                       |       | New Package Name             |
  | :----------------------------------------------------- | :---: | :--------------------------- |
  | `@baloise/design-system-components`                    | **→** | `@baloise/ds-core`           |
  | `@baloise/design-system-components-angular`            | **→** | `@baloise/ds-angular-module` |
  | `@baloise/design-system-components-angular/standalone` | **→** | `@baloise/ds-angular`        |
  | `@baloise/design-system-components-angular/legacy`     | **→** | `@baloise/ds-angular-legacy` |
  | `@baloise/design-system-components-react`              | **→** | `@baloise/ds-react`          |
  | `@baloise/design-system-components-vue`                | **→** | `@baloise/ds-vue`            |
  | `@baloise/design-system-components-table`              | **→** | `@baloise/ds-table`          |
  | `@baloise/design-system-cli`                           | **→** | `@baloise/ds-devkit`         |
  | `@baloise/design-system-\*`                            | **→** | `@baloise/ds-\*`             |

- **css**: The CSS package is marked as deprecated. Upgrade to `@baloise/ds-styles`. ( [#1344](https://github.com/baloise/design-system/pull/1344))

  Please check out the more detailed [Upgrade Guide to v16](https://design.baloise.dev/?path=/docs/development-upgrade-guides-updating-to-v16--documentation#standardizing-design-tokens).

- **button**: properties `topRounded` and `bottomRounded` has been removed, due to not match the design criteria. ( [#1344](https://github.com/baloise/design-system/pull/1344))

- **navigation**: has been removed and replaced with `bal-nav` to improve performance and SEO. ( [#1344](https://github.com/baloise/design-system/pull/1344))

### Minor Changes

- **styles**: standardize the design tokens, facilitating their export to platforms such as Figma and others. With the introduction of these new design tokens, we can automatically generate CSS utility classes. ( [#1344](https://github.com/baloise/design-system/pull/1344))

  Please check out the more detailed [Upgrade Guide to v16](https://design.baloise.dev/?path=/docs/development-upgrade-guides-updating-to-v16--documentation#standardizing-design-tokens).

## 15.2.4

### Patch Changes

- **progress-bar**: Added aria-hidden attribute to improve accessibility by preventing screen readers from unnecessarily announcing this element. ( [#1330](https://github.com/baloise/design-system/pull/1330))

- **nav**: reset active link items on options changed and always render the active meta link tree, but hide it visually. ( [#1335](https://github.com/baloise/design-system/pull/1335))

- **radio**: Removed `role="radio"` to improve semantic HTML and accessibility, ensuring ARIA roles are used correctly and only where they provide clear benefits. ( [#1314](https://github.com/baloise/design-system/pull/1314))

- **angular**: overay service define custom elements for standalone ( [#1334](https://github.com/baloise/design-system/pull/1334))

- **tabs**: Removed `role="region"` to improve semantic HTML and accessibility, ensuring ARIA roles are used correctly and only where they provide clear benefits. ( [#1318](https://github.com/baloise/design-system/pull/1318))

- **angular**: standalone modals do not load in production build ( [#1332](https://github.com/baloise/design-system/pull/1332))

## 15.2.3

### Patch Changes

- **maps**: fix image inline svg urls for the legacy marker api. ( [#1324](https://github.com/baloise/design-system/pull/1324))

## 15.2.2

### Patch Changes

- **field-hint**: Ensure proper alignment of field hint by adjusting its position to the end of the label text. ( [#1229](https://github.com/baloise/design-system/pull/1229))

- **styles**: Decouple components from css utility classes ( [#1304](https://github.com/baloise/design-system/pull/1304))

- **deps**: Update stencil to 4.11.0 ( [#1307](https://github.com/baloise/design-system/pull/1307))

- **vue**: change location of stencil components ( [#1310](https://github.com/baloise/design-system/pull/1310))

- **date**: due to an android keyboard bug the input mode is switched to decimal. ( [#1312](https://github.com/baloise/design-system/pull/1312))

## 15.2.1

### Patch Changes

- **date**: disabled years or months in the selection list cannot be selected anymore. ([#1298](https://github.com/baloise/design-system/pull/1298))
- **field**: links A11y information only for direct controls, labels and messages. ([#1299](https://github.com/baloise/design-system/pull/1299))
- **carousel**: movement for large controls variant on mobile is optimized. ([#1298](https://github.com/baloise/design-system/pull/1298))

## 15.2.0

### Minor Changes

- **angular**: schematic to seamlessly integrate the design system into your existing project. ([#1277](https://github.com/baloise/design-system/pull/1277))

### Patch Changes

- **date**: rerenders the calendar grid when min or max property was changed. ([#1282](https://github.com/baloise/design-system/pull/1282))

## 15.1.1

### Patch Changes

- **nav**: only renders the arrow symbol if link is valid ([#1275](https://github.com/baloise/design-system/pull/1275))

## 15.1.0

### Minor Changes

- **forms**: Introduce a new property `auto-invalid-off` to exclude a form control in Angular reactive forms from being visibly set as invalid. ([#1271](https://github.com/baloise/design-system/pull/1271))

### Patch Changes

- **a11y**: The term `hidden` is a reserved accessibility (a11y) value. Consequently, we found it necessary to rename our hidden properties for checkboxes, radio buttons, tabs, and steps. ([#1266](https://github.com/baloise/design-system/pull/1266))
  The attribute remains in place for now, ensuring no breaking changes at this time.

  The `hidden` property for the checkbox and radio has been updated and renamed to `non-submit.`
  The `hidden` property for the tabs and steps has been updated and renamed to `invisible.`

- **radio-group & checkbox-group**: component now updates its children when there are changes in the disabled or invalid status. ([#1264](https://github.com/baloise/design-system/pull/1264) )
- **field**: in horizontal layout now lacks right padding, and the label is aligned to the right. ([#1260](https://github.com/baloise/design-system/pull/1260))
- **carousel**: corrected the z-index value for sticky controls. ([#1265](https://github.com/baloise/design-system/pull/1265))
- **nav**: now provides enhanced support for colored service cards on mobile resolutions. ([#1261](https://github.com/baloise/design-system/pull/1261) )
- **carousel**: has vertical scrolling with tab controls on mobile devices. ([#1269](https://github.com/baloise/design-system/pull/1269))
- **angular**: `bal-ng-error` is now more synchronized with Angular lifecycles, ensuring improved visibility and hiding of validation messages. ([#1263](https://github.com/baloise/design-system/pull/1263))
- **brand-icons**: Merges styles from `<style>` elements to the style attribute of matching elements. ([#1262](https://github.com/baloise/design-system/pull/1262))

## 15.0.2

### Patch Changes

- **tooltip & popup**: Adjust shadow value to normal. ([#1240](https://github.com/baloise/design-system/pull/1240))
- **file-upload**: Trigger the `balFilesAdded` event after files have been added. ([#1236](https://github.com/baloise/design-system/pull/1236))
- **nav**: Add missing `➞` sign to the overview links in the `bal-nav` component and adjust padding and height of the `bal-popup` component in fullscreen variant. ([#1242](https://github.com/baloise/design-system/pull/1242))
- **carousel**: Reduce padding tab buttons to allow longer labels. ([#1239](https://github.com/baloise/design-system/pull/1239))

## 15.0.1

### Patch Changes

- **logo, spinner & nav**: Fix animation issue. ([#1233](https://github.com/baloise/design-system/pull/1233))
- **nav**: Fix the scrolling behavior of the `bal-nav` component on Safari browsers for touch devices. ([#1233](https://github.com/baloise/design-system/pull/1233))
- **nav**: Enhance the functionality of the `bal-nav` accordion on touch devices to ensure that when a link is activated, it behaves as an accordion. ([#1235](https://github.com/baloise/design-system/pull/1235))

## 15.0.0

### Major Changes

- **styles**: Removed the deprecated option of component styles with SASS. Instead, for customizing the component design, use CSS Variables. ([#1127](https://github.com/baloise/design-system/pull/1127))
- **angular**: The option to `applyPolyfills` for outdated browsers such as IE11 and legacy Edge has been deprecated, as the current design system no longer provides support for these versions. ([#1127](https://github.com/baloise/design-system/pull/1127))
- **angular**: Now by default the Baloise Design System will mark a form control as invalid when it's been touched and is indeed invalid. ([#1127](https://github.com/baloise/design-system/pull/1127))
  To disable this feature, set setInvalid to false in the design system configuration.

  ```ts
  BaloiseDesignSystemModule.forRoot({
    defaults: { ... },
    forms: {
      setInvalid: false, // to deactivate it
    },
  })
  ```

### Minor Changes

- **components** are now available as standalone elements for Angular v17. [#1127](https://github.com/baloise/design-system/pull/1127)

  Use the `provideBaloiseDesignSystem` provider within the app.config.ts file, where Angular providers are typically defined.

  **app.config.ts**

  ```ts
  import { ApplicationConfig, importProvidersFrom } from "@angular/core";

  import { provideBaloiseDesignSystem } from "@baloise/design-system-components-angular/standalone";

  export const appConfig: ApplicationConfig = {
    providers: [provideBaloiseDesignSystem()],
  };
  ```

  In each app component, import the necessary Baloise Design System components or a bundled set.

  **app.component.ts**

  ```ts
  import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
  import { CommonModule } from "@angular/common";
  import {
    BalApp,
    BalButton,
  } from "@baloise/design-system-components-angular/standalone";

  export interface UpdateControl {
    name: string;
    value: any;
  }

  @Component({
    selector: "app-root",
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [CommonModule, BalApp, BalButton],
    template: `
      <bal-app>
        <main class="container py-normal">
          <bal-button>My Button</bal-button>
        </main>
      </bal-app>
    `,
  })
  export class AppComponent {}
  ```

#### Webpack builder

For projects based on the builder `@angular-devkit/build-angular:browser` use the `@baloise/design-system-components-angular/legacy`.

## Previous Versions

- [Previous versions](https://github.com/baloise/design-system/blob/main/CHANGELOG_OLD.md)
