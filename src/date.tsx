import React, { useMemo, memo } from "react";
import useEvent from "react-use-event-hook";
import EasePicker, {
  EasePickOptions,
  AmpPlugin,
  LockPlugin,
  DateTime,
} from "react-easepick";
import {
  datePickerCss,
  resetButtonIcon,
  adjustLeftPosition,
} from "./common/date-picker";

export type DatePickerProps = {
  className?: string;
  date?: string;
  minDate?: string;
  maxDate?: string;
  onSelect: (date: string) => void;
  format?: string;
  placeholder?: string;
  position?: "left" | "right";
  resetButton?: boolean;
};

export function DatePicker({
  className,
  date,
  minDate,
  maxDate,
  onSelect,
  format = "DD MMM, YYYY",
  placeholder,
  position,
  resetButton = true,
}: DatePickerProps) {
  const handleSelect = useEvent(onSelect);
  const options: EasePickOptions = useMemo(
    () => ({
      css: datePickerCss,
      format,
      AmpPlugin: {
        dropdown: {
          months: true,
          years: true,
          minYear: minDate ? new DateTime(minDate).getFullYear() : undefined,
          maxYear: maxDate ? new DateTime(maxDate).getFullYear() : undefined,
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
      plugins: [AmpPlugin, LockPlugin],
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
          if (position === "right") {
            picker.ui.container.style.left = `${adjustLeftPosition(picker)}px`;
          }
        });
      },
    }),
    [date, minDate, maxDate, position]
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
