type CommonProps = {
  className?: string;
  minDate?: string;
  maxDate?: string;
  format?: string;
  placeholder?: string;
  position?: "left" | "right";
  resetButton?: boolean;
  firstDay?: number;
  lang?: string;
  zIndex?: number;
  autoApply?: boolean;
  scrollToDate?: boolean;
  documentClick?: boolean | (() => void);
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
  autoApply?: boolean;
  cancelText?: string;
  applyText?: string;
};