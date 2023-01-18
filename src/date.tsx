import merge from "lodash.merge";
import React, { useMemo, memo } from "react";
import useEvent from "react-use-event-hook";
import { DateTime } from "@easepick/datetime";
import { LockPlugin } from "@easepick/lock-plugin";
import EasePicker, { EasePickOptions } from "easepick-react";
import { datePickerCss, adjustPosition, toISODate } from "./common/date-picker";
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
  options,
  defaultOptions,
  setup,
  ...rest
}: DatePickerProps) {
  const handleSelect = useEvent(onSelect);
  const pickerOptions: EasePickOptions = useMemo(() => {
    return merge<EasePickOptions, unknown, unknown>(
      {
        ...rest,
        locale,
        css: `${datePickerCss}${css}`,
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
          setup?.(picker);
        },
        AmpPlugin: {
          dropdown: {
            months: true,
            years: true,
            ...(minDate
              ? { minYear: new DateTime(minDate).getFullYear() }
              : {}),
            ...(maxDate
              ? { maxYear: new DateTime(maxDate).getFullYear() }
              : {}),
          },
          darkMode: false,
          resetButton,
          weekNumbers,
        },
        LockPlugin: {
          minDate: minDate ? new DateTime(minDate).toJSDate() : undefined,
          maxDate: maxDate ? new DateTime(maxDate).toJSDate() : undefined,
        },
      },
      defaultOptions,
      options
    );
  }, [
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
    options,
    setup,
    ...Object.values(rest),
  ]);

  return (
    <EasePicker
      className={className}
      placeholder={placeholder}
      date={date}
      options={pickerOptions}
      data-testid={testId || "ease-picker"}
    />
  );
}

export default memo(DatePicker);
