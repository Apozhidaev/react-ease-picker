import merge from "lodash.merge";
import React, { useMemo, memo } from "react";
import useEvent from "react-use-event-hook";
import { DateTime } from "@easepick/datetime";
import { LockPlugin } from "@easepick/lock-plugin";
import { RangePlugin } from "@easepick/range-plugin";
import { PresetPlugin } from "@easepick/preset-plugin";
import EasePicker, { EasePickOptions } from "easepick-react";
import {
  rangePickerCss,
  adjustPosition,
  toISODate,
} from "./common/range-picker";
import { AmpPlugin } from "easepick-plugin-amp";
import { KeyboardPlugin } from "easepick-plugin-keyboard";
import { RangePickerProps } from "./types";

function RangePicker({
  className,
  startDate,
  endDate,
  minDate,
  maxDate,
  onSelect,
  format = "DD MMM, YYYY",
  presets,
  placeholder = "Start date – End date",
  position,
  presetPosition = "bottom",
  resetButton = true,
  weekNumbers,
  locale,
  daysLocale,
  offsetTop = 2,
  offsetLeft,
  grid = 2,
  calendars = 2,
  css,
  testId,
  options,
  defaultOptions,
  setup,
  ...rest
}: RangePickerProps) {
  const handleSelect = useEvent(onSelect);

  const customPreset = useMemo(() => {
    if (presets) {
      const presetMap: Required<EasePickOptions>["PresetPlugin"]["customPreset"] =
        {};
      presets.forEach((x) => {
        presetMap[x.label] = [
          x.startDate ? new Date(x.startDate) : new Date(),
          x.endDate ? new Date(x.endDate) : new Date(),
        ];
      });
      return presetMap;
    }
    return undefined;
  }, [
    (presets || []).flatMap(({ label, startDate, endDate }) => [
      label,
      startDate,
      endDate,
    ]),
  ]);

  const pickerOptions: EasePickOptions = useMemo(() => {
    return merge<EasePickOptions, unknown, unknown>(
      {
        ...rest,
        locale,
        css: `${rangePickerCss}${css}`,
        format,
        grid,
        calendars,
        plugins: [
          AmpPlugin,
          RangePlugin,
          LockPlugin,
          KeyboardPlugin,
          ...(customPreset ? [PresetPlugin] : []),
        ],
        setup(picker) {
          picker.on("select", (e) => {
            const { start, end } = e.detail;
            handleSelect(toISODate(start), toISODate(end));
          });
          picker.on("clear", () => {
            handleSelect("", "");
          });
          picker.on("view", (e) => {
            const { view, target } = e.detail;
            if (view === "PresetPluginButton") {
              const { start, end } = target.dataset;
              const pickedStart = picker.datePicked[0] || picker.getStartDate();
              const pickedEnd = picker.datePicked[1] || picker.getEndDate();
              if (pickedStart && pickedEnd) {
                if (
                  toISODate(pickedStart) === toISODate(Number(start)) &&
                  toISODate(pickedEnd) === toISODate(Number(end))
                ) {
                  target.classList.add("selected");
                } else {
                  target.classList.remove("selected");
                }
              }
            }
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
        RangePlugin: {
          delimiter: " – ",
          ...(daysLocale ? { locale: daysLocale } : {}),
        },
        PresetPlugin: {
          position: presetPosition,
          customPreset,
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
    customPreset,
    presetPosition,
    locale?.apply,
    locale?.cancel,
    daysLocale?.one,
    daysLocale?.two,
    daysLocale?.few,
    daysLocale?.many,
    daysLocale?.other,
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
      startDate={startDate}
      endDate={endDate}
      options={pickerOptions}
      data-testid={testId || "ease-picker"}
    />
  );
}

export default memo(RangePicker);
