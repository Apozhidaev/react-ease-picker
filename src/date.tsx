import React, { useMemo, memo } from "react";
import useEvent from "react-use-event-hook";
import { DateTime } from "@easepick/datetime";
import { LockPlugin } from "@easepick/lock-plugin";
import EasePicker, { EasePickOptions } from "easepick-react";
import {
  datePickerCss,
  resetButtonIcon,
  adjustPosition,
} from "./common/date-picker";
import { Kbd2Plugin } from "./common/kbd2-plugin";
import { AmpPlugin } from "./common/amp-plugin";
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
  locale,
  offsetTop = 2,
  offsetLeft,
  ...rest
}: DatePickerProps) {
  const handleSelect = useEvent(onSelect);
  const options: EasePickOptions = useMemo(
    () => ({
      ...rest,
      locale,
      css: datePickerCss,
      date: date ? new DateTime(date).toJSDate() : undefined,
      format,
      plugins: [AmpPlugin, LockPlugin, Kbd2Plugin],
      setup(picker) {
        picker.on("select", (e) => {
          const { date } = e.detail;
          handleSelect(new DateTime(date).format("YYYY-MM-DD"));
        });
        picker.on("clear", () => {
          handleSelect("");
          picker.hide();
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
        resetButton,
        darkMode: false,
        locale: {
          resetButton: resetButtonIcon,
        },
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
      locale?.apply,
      locale?.cancel,
      offsetTop,
      offsetLeft,
      ...Object.values(rest),
    ]
  );

  return (
    <EasePicker
      className={className}
      placeholder={placeholder}
      options={options}
    />
  );
}

export default memo(DatePicker);
