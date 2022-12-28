// @ts-nocheck
import {
  BasePlugin,
  IEventDetail,
  IPlugin,
  IBaseConfig,
} from "@easepick/base-plugin";
import { RangePlugin } from "@easepick/range-plugin";

export interface IKbd2Plugin extends IBaseConfig {
  unitIndex?: number;
  dayIndex?: number;
}

declare module "@easepick/core/dist/types" {
  interface IPickerConfig {
    Kbd2Plugin?: IKbd2Plugin;
  }
}

export class Kbd2Plugin extends BasePlugin implements IPlugin {
  public rangePlugin: RangePlugin;

  public binds = {
    onView: this.onView.bind(this),
    onKeydown: this.onKeydown.bind(this),
    onOpen: this.onOpen.bind(this),
  };

  public options: IKbd2Plugin = {
    unitIndex: 1,
    dayIndex: 2,
  };

  /**
   * Returns plugin name
   *
   * @returns String
   */
  public getName(): string {
    return "Kbd2Plugin";
  }

  /**
   * - Called automatically via BasePlugin.attach() -
   * The function execute on initialize the picker
   */
  public onAttach(): void {
    const element = this.picker.options.element as HTMLElement;
    element.addEventListener("keydown", this.binds.onOpen, { capture: true });

    this.picker.on("view", this.binds.onView);
    this.picker.on("keydown", this.binds.onKeydown);
  }

  /**
   * - Called automatically via BasePlugin.detach() -
   */
  public onDetach(): void {
    const element = this.picker.options.element as HTMLElement;
    element.removeEventListener("keydown", this.binds.onOpen, {
      capture: true,
    });

    this.picker.off("view", this.binds.onView);
    this.picker.off("keydown", this.binds.onKeydown);
  }

  private onOpen(event) {
    switch (event.code) {
      case "Enter":
      case "Space":
        event.preventDefault();

        this.picker.show({ target: this.picker.options.element });
        break;

      case "Escape":
        this.picker.hide();
        break;
    }
  }

  /**
   * Function `view` event
   * Adds `tabIndex` to the picker elements
   *
   * @param event
   */
  private onView(event: CustomEvent) {
    const { view, target }: IEventDetail = event.detail;

    if (target && "querySelector" in target) {
      if (
        view === "CalendarDay" &&
        !["locked", "not-available"].some((x) => target.classList.contains(x))
      ) {
        target.tabIndex = this.options.dayIndex;
      } else {
        const elems = target.querySelectorAll(".unit:not(.day)");
        [...elems].forEach(
          (el: HTMLElement) => (el.tabIndex = this.options.unitIndex)
        );
        const selects = target.querySelectorAll("select");
        [...selects].forEach(
          (el: HTMLElement) => (el.tabIndex = this.options.unitIndex)
        );
      }
    }
  }

  /**
   * Function for `keydown` event
   * Handle keys when the picker has focus
   *
   * @param event
   */
  private onKeydown(event) {
    this.onMouseEnter(event);

    switch (event.code) {
      case "ArrowUp":
      case "ArrowDown":
        this.verticalMove(event);
        break;

      case "ArrowLeft":
      case "ArrowRight":
        this.horizontalMove(event);
        break;

      case "Enter":
      case "Space":
        this.handleEnter(event);
        break;

      case "Escape":
        this.picker.hide();
        break;
    }
  }

  /**
   * Find closest day elements
   *
   * @param layout
   * @param target
   * @param isAllow
   * @returns Boolean
   */
  private findAllowableDaySibling(layout, target, isAllow) {
    const elms = Array.from(
      layout.querySelectorAll(`.day[tabindex="${this.options.dayIndex}"]`)
    );
    const targetIdx = elms.indexOf(target);

    return elms.filter((el: HTMLElement, idx) => {
      return isAllow(idx, targetIdx) && el.tabIndex === this.options.dayIndex;
    })[0];
  }

  /**
   * Switch month via buttons (previous month, next month)
   *
   * @param evt
   */
  private changeMonth(evt) {
    const arrows = {
      ArrowLeft: "previous",
      ArrowRight: "next",
    };
    const button = this.picker.ui.container.querySelector(
      `.${arrows[evt.code]}-button[tabindex="${this.options.unitIndex}"]`
    );

    if (
      button &&
      !button.parentElement.classList.contains(`no-${arrows[evt.code]}-month`)
    ) {
      button.dispatchEvent(new Event("click", { bubbles: true }));

      setTimeout(() => {
        let focusEl = null;

        switch (evt.code) {
          case "ArrowLeft":
            // eslint-disable-next-line no-case-declarations
            const elms = this.picker.ui.container.querySelectorAll(
              `.day[tabindex="${this.options.dayIndex}"]`
            );
            focusEl = elms[elms.length - 1];
            break;

          case "ArrowRight":
            focusEl = this.picker.ui.container.querySelector(
              `.day[tabindex="${this.options.dayIndex}"]`
            );
            break;
        }

        if (focusEl) {
          focusEl.focus();
        }
      });
    }
  }

  /**
   * Handle ArrowUp and ArrowDown keys
   *
   * @param evt
   */
  private verticalMove(evt) {
    const target = evt.target;

    if (target.classList.contains("day")) {
      evt.preventDefault();

      const nextElement = this.findAllowableDaySibling(
        this.picker.ui.container,
        target,
        (idx, targetIdx) => {
          targetIdx = evt.code === "ArrowUp" ? targetIdx - 7 : targetIdx + 7;
          return idx === targetIdx;
        }
      );

      if (nextElement) {
        (nextElement as HTMLElement).focus();
      }
    }
  }

  /**
   * Handle ArrowLeft and ArrowRight keys
   *
   * @param evt
   */
  private horizontalMove(evt) {
    const target = evt.target;

    if (target.classList.contains("day")) {
      evt.preventDefault();

      const nextElement = this.findAllowableDaySibling(
        this.picker.ui.container,
        target,
        (idx, targetIdx) => {
          targetIdx = evt.code === "ArrowLeft" ? targetIdx - 1 : targetIdx + 1;
          return idx === targetIdx;
        }
      );

      if (nextElement) {
        (nextElement as HTMLElement).focus();
      } else {
        this.changeMonth(evt);
      }
    }
  }

  /**
   * Handle Enter and Space keys
   *
   * @param evt
   */
  private handleEnter(evt) {
    const target = evt.target;

    if (target.classList.contains("day")) {
      evt.preventDefault();

      target.dispatchEvent(new Event("click", { bubbles: true }));

      setTimeout(() => {
        this.rangePlugin = this.picker.PluginManager.getInstance("RangePlugin");

        if (this.rangePlugin || !this.picker.options.autoApply) {
          const currentFocus =
            this.picker.ui.container.querySelector(".day.selected");

          if (currentFocus) {
            setTimeout(() => {
              (currentFocus as HTMLElement).focus();
            });
          }
        }
      });
    }
  }

  /**
   * Manually fire `mouseenter` event to display date range correctly
   *
   * @param evt
   */
  private onMouseEnter(evt) {
    const target = evt.target;

    if (target.classList.contains("day")) {
      setTimeout(() => {
        const e = this.picker.ui.shadowRoot.activeElement;
        if (e) {
          e.dispatchEvent(new Event("mouseenter", { bubbles: true }));
        }
      });
    }
  }
}
