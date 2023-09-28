// Resets CSS for all browser
import "@baloise/design-system-css/css/normalize.css";
import "@baloise/design-system-css/css/structure.css";

// Custom font faces
import "@baloise/design-system-css/css/font.css";

// Core CSS, always required
import "@baloise/design-system-css/css/core.css";

// CSS utilities classes (optional)
import "@baloise/design-system-css/css/border.css";
import "@baloise/design-system-css/css/color.css";
import "@baloise/design-system-css/css/display.css";
import "@baloise/design-system-css/css/flex.css";
import "@baloise/design-system-css/css/grid.css";
import "@baloise/design-system-css/css/opacity.css";
import "@baloise/design-system-css/css/radius.css";
import "@baloise/design-system-css/css/shadow.css";
import "@baloise/design-system-css/css/spacing.css";
import "@baloise/design-system-css/css/typography.css";
import "@baloise/design-system-css/css/z-index.css";

import { defineCustomElements } from "@baloise/design-system-components/loader";
import { balSnackbarController, BalToastController } from "@baloise/design-system-components";

defineCustomElements();
window.balSnackbarController = balSnackbarController
window.BalToastController = BalToastController
