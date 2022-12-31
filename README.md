# react-ease-picker

DatePicker and RangePicker base on [easepick](https://easepick.com/).

![DatePicker](https://github.com/Apozhidaev/react-ease-picker/blob/main/img/date.png)
![RangePicker](https://github.com/Apozhidaev/react-ease-picker/blob/main/img/range.png)

## How to Use

Step 1.
```bash
npm i react-ease-picker
```

Step 2.
```jsx
import { DatePicker, RangePicker } from "react-ease-picker";

function App() {
  return (
    <>
      <DatePicker
        onSelect={(date) => {
          console.log(date);
        }}
      />
      <RangePicker
        minDate="2020-01-01"
        maxDate="2023-01-01"
        onSelect={(start, end) => {
          console.log(start, end);
        }}
        presets={[
          {
            label: "Last Week",
            startDate: "2022-01-01",
            endDate: "2023-01-01",
          },
          {
            label: "Last Month",
            startDate: "2021-01-01",
            endDate: "2023-01-01",
          },
        ]}
        position="right"
      />
    </>
  );
}

export default App;

```
 
### Props

```typescript
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
  daysLocale?: {
    one?: string;
    two?: string;
    few?: string;
    many?: string;
    other?: string;
  };
};
```

## Customize
```css
:root {
  --ease-color-bg-default: #fff;
  --ease-color-bg-secondary: #f1f5f9;
  --ease-color-fg-default: #1e293b;
  --ease-color-fg-primary: #2e6fda;
  --ease-color-fg-secondary: #64748b;
  --ease-color-fg-selected: #fff;
  --ease-color-fg-muted: #64748b;
  --ease-color-fg-accent: #e63757;
  --ease-color-btn-primary-bg: #2e6fda;
  --ease-color-btn-primary-fg: #fff;
  --ease-color-btn-primary-border: #2e6fda;
  --ease-color-btn-primary-hover-bg: #2c67cd;
  --ease-color-btn-primary-hover-fg: #fff;
  --ease-color-btn-primary-hover-border: #2c67cd;
  --ease-color-btn-primary-disabled-bg: #80aff8;
  --ease-color-btn-primary-disabled-fg: #fff;
  --ease-color-btn-primary-disabled-border: #80aff8;
  --ease-color-btn-secondary-bg: #fff;
  --ease-color-btn-secondary-fg: #475569;
  --ease-color-btn-secondary-border: #cbd5e1;
  --ease-color-btn-secondary-hover-bg: #f8fafc;
  --ease-color-btn-secondary-hover-fg: #475569;
  --ease-color-btn-secondary-hover-border: #cbd5e1;
  --ease-color-btn-secondary-disabled-bg: #cbd5e1;
  --ease-color-btn-secondary-disabled-fg: #fff;
  --ease-color-btn-secondary-disabled-border: #cbd5e1;
  --ease-color-border-default: #cbd5e1;
  --ease-color-border-locked: #f9f9f9;
  --ease-day-width: 43px;
  --ease-day-height: 37px;
  --ease-z-index: 40;
  --ease-border-radius: 2px;
  --ease-primary-color: #2e6fda;
  --ease-secondary-color: #64748b;
  --ease-font-family: inherit;
  --ease-box-shadow: 0 4px 28px 0 rgb(0 0 0 / 12%);
  --ease-month-name-font-weight: 700;
  --ease-focus-color: #94a3b8;
  --ease-select-outline-color: #e2e8f0;
  --ease-color-fg-locked: #9e9e9e;
  --ease-color-bg-locked: #ffab91;
  --ease-color-bg-unavailable: #f9f9f9;
  --ease-color-bg-inrange: #e6effe;
  --ease-color-bg-tooltip: #fff;
  --ease-color-fg-tooltip: #1e293b;
}
```
