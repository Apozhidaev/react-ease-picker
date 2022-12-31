import React, { useMemo, memo } from "react";
import useEvent from "react-use-event-hook";
import { DateTime } from "@easepick/datetime";
import { LockPlugin } from "@easepick/lock-plugin";
import EasePicker, { EasePickOptions } from "easepick-react";
import {
  datePickerCss,
  adjustPosition,
  toISODate,
} from "./common/date-picker";
import { AmpPlugin } from "easepick-plugin-amp";
import { KeyboardPlugin } from "easepick-plugin-keyboard";
import { DatePickerProps } from "./types";

function DatePicker({
  className,
  date,
  minDate,
  maxDate,
  onSelect,
  format = "DD MMM, YYYY",
  placeholder,
  position,
  resetButton = true,
  weekNumbers,
  locale,
  offsetTop = 2,
  offsetLeft,
  grid = 1,
  calendars = 1,
  css,
  testId,
  ...rest
}: DatePickerProps) {
  const handleSelect = useEvent(onSelect);
  const options: EasePickOptions = useMemo(
    () => ({
      ...rest,
      locale,
      css: `${datePickerCss}${css}`,
      date: date ? new DateTime(date).toJSDate() : undefined,
      format,
      grid,
      calendars,
      plugins: [AmpPlugin, LockPlugin, KeyboardPlugin],
      setup(picker) {
        picker.on("select", (e) => {
          const { date } = e.detail;
          handleSelect(toISODate(date));
        });
        picker.on("clear", () => {
          handleSelect("");
        });
        picker.on("show", () => {
          adjustPosition(picker, position, offsetTop, offsetLeft);
        });
      },
      AmpPlugin: {
        dropdown: {
          months: true,
          years: true,
          ...(minDate ? { minYear: new DateTime(minDate).getFullYear() } : {}),
          ...(maxDate ? { maxYear: new DateTime(maxDate).getFullYear() } : {}),
        },
        darkMode: false,
        resetButton,
        weekNumbers,
      },
      LockPlugin: {
        minDate: minDate ? new DateTime(minDate).toJSDate() : undefined,
        maxDate: maxDate ? new DateTime(maxDate).toJSDate() : undefined,
      },
    }),
    [
      date,
      minDate,
      maxDate,
      format,
      position,
      resetButton,
      weekNumbers,
      locale?.apply,
      locale?.cancel,
      offsetTop,
      offsetLeft,
      grid,
      calendars,
      css,
      ...Object.values(rest),
    ]
  );

  return (
    <EasePicker
      className={className}
      placeholder={placeholder}
      options={options}
      data-testid={testId || "ease-picker"}
    />
  );
}

export default memo(DatePicker);
