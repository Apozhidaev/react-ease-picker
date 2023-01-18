import type { EasePickOptions } from "easepick-react";

type CommonProps = {
  className?: string;
  minDate?: string;
  maxDate?: string;
  format?: string;
  placeholder?: string;
  position?: "left" | "right";
  resetButton?: boolean;
  weekNumbers?: boolean;
  firstDay?: number;
  lang?: string;
  scrollToDate?: boolean;
  documentClick?: boolean | (() => void);
  autoApply?: boolean;
  locale?: {
    cancel?: string;
    apply?: string;
  };
  offsetTop?: number;
  offsetLeft?: number;
  grid?: number;
  calendars?: number;
  css?: string;
  testId?: string;
  options?: EasePickOptions;
  defaultOptions?: EasePickOptions;
  setup?: EasePickOptions["setup"];
};

export type DatePickerProps = CommonProps & {
  date?: string;
  onSelect: (date: string) => void;
};

export type RangePickerPreset = {
  label: string;
  startDate?: string;
  endDate?: string;
};

export type RangePickerProps = CommonProps & {
  startDate?: string;
  endDate?: string;
  onSelect: (start: string, end: string) => void;
  presets?: RangePickerPreset[];
  presetPosition?: "left" | "right" | "top" | "bottom";
  daysLocale?: {
    one?: string;
    two?: string;
    few?: string;
    many?: string;
    other?: string;
  };
};
