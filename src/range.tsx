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
  }, [JSON.stringify(presets)]);
  const options: EasePickOptions = useMemo(
    () => ({
      ...rest,
      locale,
      css: rangePickerCss,
      format,
      grid: 2,
      calendars: 2,
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
          handleSelect(
            new DateTime(start).format("YYYY-MM-DD"),
            new DateTime(end).format("YYYY-MM-DD")
          );
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
              const startIso = new DateTime(pickedStart).format("YYYY-MM-DD");
              const endIso = new DateTime(pickedEnd).format("YYYY-MM-DD");
              const btnStartIso = new DateTime(Number(start)).format(
                "YYYY-MM-DD"
              );
              const btnEndIso = new DateTime(Number(end)).format("YYYY-MM-DD");
              if (startIso === btnStartIso && endIso === btnEndIso) {
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

export default memo(RangePicker);
