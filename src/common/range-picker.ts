import { coreCss } from "./assets/core";
import { ampCss } from "./assets/amp";
import { lockCss } from "./assets/lock";
import { rangeCss } from "./assets/range";
import { presetCss } from "./assets/preset";
import { adjustPosition, toISODate } from "./utils";

const rangePickerCss = `${coreCss}${lockCss}${rangeCss}${presetCss}${ampCss}`;

export { rangePickerCss, adjustPosition, toISODate };
