/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/iconbutton/filled-tonal-icon-button.js';
import '../menu/menu';

import {css, CSSResultGroup, html, LitElement} from 'lit';

import {type MenuItemTriggeredEvent} from '../menu/menu_item';

import {IconDropdownOption} from './icon-dropdown-option';

/** The SVG to use in the trailing icon slot when the dropdown is closed. */
const ARROW_DROP_DOWN_SVG = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960">
    <path d="M480-376.348 274.848-581.5h410.304L480-376.348Z"/>
  </svg>`;

/** A chromeOS compliant icon-dropdown. */
export class IconDropdown extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      font: var(--cros-body-0-font);
    }

    .button-icon-container {
      display: flex;
      place-content: center;
    }

    .button-icon-container .dropdown-arrow {
      /* 5px overlap with the button icon. */
      margin-inline: -5px 1px;
    }

    .button-icon-container .dropdown-icon {
      margin-inline: 4px 0;
    }

    md-filled-tonal-icon-button {
      --md-filled-tonal-icon-button-icon-size: 20px;
      --md-filled-tonal-icon-button-container-height: 40px;
      --md-filled-tonal-icon-button-container-shape: 12px;
      --md-filled-tonal-icon-button-container-width: 40px;
    }
  `;

  /** @nocollapse */
  static override properties = {
    ariaLabel: {type: String, reflect: true, attribute: 'aria-label'},
    value: {type: String},
  };

  /** @nocollapse */
  static events = {CHANGE: 'change'} as const;

  /**
   * The value of the first selected option in the dropdown or an empty string
   * if no options are selected.
   * @export
   */
  value: string;

  constructor() {
    super();

    // TODO: b/339905985 - Set inital value to the first selected option in
    // first update.
    this.value = '';
  }

  override render() {
    return html`
      <div @cros-menu-item-triggered=${this.onMenuItemTriggered}>
        ${this.renderButtonContent()}
        ${this.renderMenuContent()}
      </div>
    `;
  }

  private renderButtonContent() {
    return html`
      <md-filled-tonal-icon-button id="button" aria-label=${
        this.ariaLabel ?? ''}>
        <div class="button-icon-container">
          <span class="dropdown-icon"><slot name="button-icon"></slot></span>
          <span class="dropdown-arrow">${ARROW_DROP_DOWN_SVG}</span>
        </div>
      </md-filled-tonal-icon-button>
    `;
  }

  private renderMenuContent() {
    return html`
      <cros-menu anchor="button">
        <slot></slot>
      </cros-menu>
    `;
  }

  /**
   * Handles dropdown option selection. If the selected option is the same as
   * the current value, do nothing. Otherwise, update the value and dispatch a
   * change event.
   *
   * @param e The event object.
   */
  private onMenuItemTriggered(e: MenuItemTriggeredEvent) {
    const menuItem = e.detail.menuItem as IconDropdownOption;
    if (menuItem?.value === this.value) {
      return;
    }
    this.value = menuItem?.value ?? '';
    this.dispatchEvent(
        new Event(IconDropdown.events.CHANGE, {bubbles: true, composed: true}));
  }
}

customElements.define('cros-icon-dropdown', IconDropdown);

declare global {
  interface HTMLElementEventMap {
    [IconDropdown.events.CHANGE]: Event;
  }

  interface HTMLElementTagNameMap {
    'cros-icon-dropdown': IconDropdown;
  }
}
