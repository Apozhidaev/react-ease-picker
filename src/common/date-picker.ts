import { coreCss } from "./assets/core";
import { ampCss, resetButtonIcon } from "./assets/amp";
import { lockCss } from "./assets/lock";
import { adjustPosition } from "./utils";

const datePickerCss = `${coreCss}${lockCss}${ampCss}`;

export { resetButtonIcon, datePickerCss, adjustPosition };
