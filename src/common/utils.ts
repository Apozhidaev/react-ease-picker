import type { Core } from "@easepick/core";
import { DateTime } from "@easepick/datetime";

export function adjustPosition(
  picker: Core,
  position?: "left" | "right",
  offsetTop?: number,
  offsetLeft?: number
) {
  if (position === "right") {
    const rect = (
      picker.options.element as HTMLElement
    ).getBoundingClientRect();
    const wrapper = picker.ui.wrapper.getBoundingClientRect();
    const container = picker.ui.container.getBoundingClientRect();
    picker.ui.container.style.left = `${
      rect.left - wrapper.left - container.width + rect.width
    }px`;
  }
  if (offsetTop) {
    picker.ui.container.style.top = `${
      parseFloat(picker.ui.container.style.top) + offsetTop
    }px`;
  }
  if (offsetLeft) {
    picker.ui.container.style.left = `${
      parseFloat(picker.ui.container.style.left) + offsetLeft
    }px`;
  }
}

export function toISODate(date: number | string | Date | DateTime) {
  return date instanceof DateTime
    ? date.format("YYYY-MM-DD")
    : new DateTime(date).format("YYYY-MM-DD");
}
