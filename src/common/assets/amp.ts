export const ampCss = /* css */ `
:host {
  --month-name-font-weight: var(--ease-month-name-font-weight, 700);
  --focus-color: var(--ease-focus-color, #94a3b8);
  --select-outline-color: var(--ease-select-outline-color, #e5e7eb);
}
.container.amp-plugin .calendars .calendar > .header .month-name {
  align-items: center;
  -moz-column-gap: 5px;
  column-gap: 5px;
  display: flex;
  justify-content: center;
}
.container.amp-plugin .calendars .calendar > .header .month-name select {
  border: none;
  font-size: 14px;
  padding: 3px;
  border-radius: var(--border-radius);
}
.container.amp-plugin
  .calendars
  .calendar
  > .header
  .month-name
  select.month-name--dropdown {
  font-weight: var(--month-name-font-weight);
}
.container.amp-plugin .calendars .calendar > .header .reset-button {
  order: 4;
}
.container.amp-plugin
  .calendars.calendars:not(.grid-1)
  .calendar
  > .header
  .reset-button {
  visibility: hidden;
}
.container.amp-plugin
  .calendars.calendars:not(.grid-1)
  .calendar:last-child
  > .header
  .reset-button {
  visibility: visible;
}
.container.amp-plugin.week-numbers .calendar > .daynames-row,
.container.amp-plugin.week-numbers .calendar > .days-grid {
  grid-template-columns: 30px repeat(7, 1fr);
}
.container.amp-plugin.week-numbers .calendar > .daynames-row .wnum-header,
.container.amp-plugin.week-numbers .calendar > .daynames-row .wnum-item,
.container.amp-plugin.week-numbers .calendar > .days-grid .wnum-header,
.container.amp-plugin.week-numbers .calendar > .days-grid .wnum-item {
  align-items: center;
  color: var(--color-fg-muted);
  display: flex;
  font-size: 12px;
  justify-content: center;
}
.unit:focus-visible {
  outline-width: 1px;
  outline-style: dashed;
  outline-color: var(--focus-color);
  z-index: 1;
  outline-offset: 1px;
}
select.unit {
  outline-width: 1px;
  outline-style: solid;
  outline-color: var(--select-outline-color);
  outline-offset: 1px;
}
select.unit:focus-visible {
  outline-color: var(--focus-color);
  outline-style: solid;
}
`;