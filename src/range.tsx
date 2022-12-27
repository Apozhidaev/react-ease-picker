import React, { useMemo, memo } from "react";
import useEvent from "react-use-event-hook";
import EasePicker, {
  EasePickOptions,
  AmpPlugin,
  RangePlugin,
  LockPlugin,
  PresetPlugin,
  DateTime,
} from "react-easepick";
import {
  rangePickerCss,
  resetButtonIcon,
  adjustLeftPosition,
} from "./common/range-picker";
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
  cancelText,
  applyText,
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
      css: rangePickerCss,
      format,
      grid: 2,
      calendars: 2,
      plugins: [
        AmpPlugin,
        RangePlugin,
        LockPlugin,
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
          if (position === "right") {
            picker.ui.container.style.left = `${adjustLeftPosition(picker)}px`;
          }
        });
      },
      locale: {
        ...(cancelText ? { cancel: cancelText } : {}),
        ...(applyText ? { apply: applyText } : {}),
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
      cancelText,
      applyText,
      customPreset,
      Object.values(rest),
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
