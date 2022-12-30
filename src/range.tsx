import React, { useMemo, memo } from "react";
import useEvent from "react-use-event-hook";
import { DateTime } from "@easepick/datetime";
import { LockPlugin } from "@easepick/lock-plugin";
import { RangePlugin } from "@easepick/range-plugin";
import { PresetPlugin } from "@easepick/preset-plugin";
import EasePicker, { EasePickOptions } from "easepick-react";
import {
  rangePickerCss,
  resetButtonIcon,
  adjustPosition,
  toISODate,
} from "./common/range-picker";
import { Kbd2Plugin } from "./common/kbd2-plugin";
import { AmpPlugin } from "./common/amp-plugin";
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
  resetButton = true,
  locale,
  daysLocale,
  offsetTop = 2,
  offsetLeft,
  grid = 2,
  calendars = 2,
  css,
  testId,
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

  const options: EasePickOptions = useMemo(
    () => ({
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
        Kbd2Plugin,
        ...(customPreset ? [PresetPlugin] : []),
      ],
      setup(picker) {
        picker.on("select", (e) => {
          const { start, end } = e.detail;
          handleSelect(toISODate(start), toISODate(end));
        });
        picker.on("clear", () => {
          handleSelect("", "");
          picker.hide();
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
                target.classList.add("active");
              } else {
                target.classList.remove("active");
              }
            }
          }
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
      RangePlugin: {
        startDate: startDate ? new DateTime(startDate) : undefined,
        endDate: endDate ? new DateTime(endDate) : undefined,
        delimiter: " – ",
        ...(daysLocale ? { locale: daysLocale } : {}),
      },
      PresetPlugin: {
        position: "bottom",
        customPreset,
      },
    }),
    [
      startDate,
      endDate,
      minDate,
      maxDate,
      format,
      position,
      resetButton,
      customPreset,
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

export default memo(RangePicker);
