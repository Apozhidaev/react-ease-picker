export const resetButtonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>`;

export const ampCss = /* css */ `
:host {
  --month-name-font-weight: var(--ease-month-name-font-weight, 700);
  --focus-color: var(--ease-focus-color, #94a3b8);
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
`;