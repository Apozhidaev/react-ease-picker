import { coreCss } from "./assets/core";
import { ampCss, resetButtonIcon } from "./assets/amp";
import { lockCss } from "./assets/lock";
import { rangeCss } from "./assets/range";
import { presetCss } from "./assets/preset";
import { adjustLeftPosition } from "./utils";

const rangePickerCss = `${coreCss}${lockCss}${rangeCss}${presetCss}${ampCss}`;

export { resetButtonIcon, rangePickerCss, adjustLeftPosition };
