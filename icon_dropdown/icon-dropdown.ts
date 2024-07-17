/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/iconbutton/filled-tonal-icon-button.js';
import '../menu/menu';

import {SelectOption} from '@material/web/select/select-option.js';
import {css, CSSResultGroup, html, LitElement, PropertyValues} from 'lit';
import {createRef, ref} from 'lit/directives/ref';

import {type Menu} from '../menu/menu';
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
      --_button-icon-size: 20px;

      display: inline-block;
      font: var(--cros-body-0-font);
    }

    :host([size="large"]) {
      --_button-icon-size: 24px;
    }

    :host([shape="circle"]) md-filled-tonal-icon-button {
      --md-filled-tonal-icon-button-container-shape: 100vmax;
      --md-filled-tonal-icon-button-container-height: 40px;
      --md-filled-tonal-icon-button-container-width: 48px;
      --md-icon-button-icon-size: var(--_button-icon-size);
    }

    :host([shape="circle"][size="large"]) md-filled-tonal-icon-button {
      --md-filled-tonal-icon-button-container-height: 56px;
      --md-filled-tonal-icon-button-container-width: 72px;
    }

    :host([shape="square"]) md-filled-tonal-icon-button {
      --md-filled-tonal-icon-button-container-shape: 12px;
      --md-filled-tonal-icon-button-container-height: 40px;
      --md-filled-tonal-icon-button-container-width: 40px;
    }

    :host([shape="square"][size="large"]) md-filled-tonal-icon-button {
      --md-filled-tonal-icon-button-container-shape: 16px;
      --md-filled-tonal-icon-button-container-height: 56px;
      --md-filled-tonal-icon-button-container-width: 72px;
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
      --md-filled-tonal-icon-button-icon-size: var(--_button-icon-size);
    }

    slot[name='button-icon']::slotted(*) {
      height: var(--_button-icon-size);
      width: var(--_button-icon-size);
    }
  `;

  /** @nocollapse */
  static override properties = {
    ariaLabel: {type: String, reflect: true, attribute: 'aria-label'},
    value: {type: String},
    shape: {type: String, reflect: true},
    size: {type: String, reflect: true},
  };

  /** @nocollapse */
  static events = {CHANGE: 'change'} as const;

  /**
   * The value of the first selected option in the dropdown or an empty string
   * if no options are selected.
   * @export
   */
  value: string;

  /**
   * The shape of the dropdown icon button. Used to apply CSS.
   * @export
   */
  shape: 'circle'|'square';

  /**
   * The size of the dropdown icon button. Used to apply CSS.
   * @export
   */
  size: 'default'|'large';

  protected menuRef = createRef<Menu>();

  constructor() {
    super();

    this.value = '';
    this.shape = 'square';
    this.size = 'default';
  }

  get crosMenu() {
    return this.renderRoot?.querySelector('cros-menu');
  }

  get options(): SelectOption[] {
    return (this.crosMenu?.items ?? []) as SelectOption[];
  }

  override updated(changedProperties: PropertyValues<IconDropdown>) {
    if (changedProperties.has('value')) {
      this.updateOptionsSelected();
    }
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
        this.ariaLabel ?? ''}
        @click=${() => this.toggleMenu()}
        @keydown=${(e: KeyboardEvent) => this.onKeydown(e)}
      >
        <div class="button-icon-container">
          <span class="dropdown-icon"><slot name="button-icon"></slot></span>
          <span class="dropdown-arrow">${ARROW_DROP_DOWN_SVG}</span>
        </div>
      </md-filled-tonal-icon-button>
    `;
  }

  private onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.toggleMenu();
    }
  }

  private toggleMenu() {
    this.menuRef.value?.open ? this.menuRef.value?.close() :
                               this.menuRef.value?.show();
  }

  private renderMenuContent() {
    return html`
      <cros-menu anchor="button" ${ref(this.menuRef)}>
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
    // If menu item with [itemEnd="switch"] the detail will not be sent.
    // TODO: b/339905985 - Handle menu-item where [itemEnd="switch"]. These
    // menu-items are not standard options and probably need to be handle by the
    // parent component to implement the correct behavior.
    if (!menuItem) {
      return;
    }
    if (menuItem.value === this.value) {
      return;
    }
    this.value = menuItem.value ?? '';
    this.updateOptionsSelected();
    this.dispatchEvent(
        new Event(IconDropdown.events.CHANGE, {bubbles: true, composed: true}));
  }

  private updateOptionsSelected() {
    for (const option of this.options) {
      option.selected = option.value === this.value;
    }
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
