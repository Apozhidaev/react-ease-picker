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

type Preset = {
  label: string;
  startDate: string;
  endDate: string;
};

type Props = {
  className?: string;
  startDate?: string;
  endDate?: string;
  minDate?: string;
  maxDate?: string;
  onSelect: (start: string, end: string) => void;
  format?: string;
  presets?: Preset[];
  placeholder?: string;
  position?: "left" | "right";
  autoApply?: boolean;
  resetButton?: boolean;
};

export function RangePicker({
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
  autoApply = true,
  resetButton = true,
}: Props) {
  const handleSelect = useEvent(onSelect);
  const customPreset = useMemo(() => {
    if (presets) {
      const presetMap: Required<EasePickOptions>["PresetPlugin"]["customPreset"] =
        {};
      presets.forEach((x) => {
        presetMap[x.label] = [new Date(x.startDate), new Date(x.endDate)];
      });
      return presetMap;
    }
    return undefined;
  }, [JSON.stringify(presets)]);
  const options: EasePickOptions = useMemo(
    () => ({
      css: rangePickerCss,
      format,
      grid: 2,
      calendars: 2,
      autoApply,
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
      RangePlugin: {
        startDate: startDate ? new DateTime(startDate) : undefined,
        endDate: endDate ? new DateTime(endDate) : undefined,
        delimiter: " – ",
      },
      PresetPlugin: {
        position: "bottom",
        customPreset,
      },
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
    }),
    [startDate, endDate, minDate, maxDate, position, customPreset]
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
