/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/menu/menu-item';
import '../icon/icon';
import '../switch/switch';

import {MenuItem as MenuItemType} from '@material/web/menu/menu-item';
import {css, CSSResultGroup, html, LitElement} from 'lit';

// From google3/chrome/apps/common/client/icons/chromeos/ic_checked.svg
const CHECKED_ICON = html`
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" slot="end" class="slot-end" id="checkedIcon">
    <path d="M13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289Z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z"/>
  </svg>
`;

/**
 * A cros compliant menu-item component for use in cros-menu.
 */
export class MenuItem extends LitElement implements MenuItemType {
  /** @nocollapse */
  // TODO(b/198759625): Remove negative margin-inline-end when mwc token
  // available (padding 16px)
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    md-menu-item {
      --md-focus-ring-color: var(--cros-sys-focus_ring);
      --md-list-item-list-item-hover-state-layer-color: var(--cros-sys-hover_on_subtle);
      --md-list-item-list-item-hover-state-layer-opacity: 1;
      --md-list-item-list-item-label-text-type: var(--cros-typography-button2);
      --md-list-item-list-item-leading-icon-color: var(--cros-sys-on_surface);
      --md-list-item-list-item-pressed-state-layer-color: var(--cros-sys-ripple_neutral_on_subtle);
      --md-list-item-list-item-pressed-state-layer-opacity: 1;
    }
    :host {
      display: inline block;
    }
    cros-icon {
      width: 20px;
      height: 20px;
      color: var(--cros-sys-on_surface);
    }
    cros-switch {
      width: 32px;
      height: 18px;
    }
    .slot-end {
      font: var(--cros-typography-button2);
    }
    #shortcut {
      color: var(--cros-sys-secondary);
    }
    #checkedIcon {
      fill: var(--cros-sys-primary);
    }
  `;

  static override shadowRootOptions = {
    mode: 'open' as const,
    delegatesFocus: true,
  };

  /** @nocollapse */
  static override properties = {
    headline: {type: String},
    itemStart: {type: String},
    itemEnd: {type: String},
    active: {type: Boolean, reflect: true},
    disabled: {type: Boolean},
    isMenuItem: {type: Boolean, reflect: true, attribute: 'md-menu-item'},
    isListItem: {type: Boolean, reflect: true, attribute: 'md-list-item'},
    checked: {type: Boolean, reflect: true},
  };

  /**
   * Headline is the primary text of the list item, name follows from
   * md-menu-item.
   * @export
   */
  headline: string;
  /** @export */
  itemStart: 'icon'|'';
  /** @export */
  itemEnd: 'shortcut'|'icon'|'switch'|null;

  // The following properties are necessary for wrapping and keyboard
  // navigation
  /**
   * Whether or not the menu-item is disabled.
   * @export
   */
  disabled: boolean;
  /** @export */
  readonly isMenuItem: boolean;
  /** @export */
  readonly isListItem: boolean;
  /**
   * Whether or not the element is actively being interacted with by md-list.
   * When active, tabindex is set to 0, and focuses the underlying item.
   * @export
   */
  active: boolean;
  checked: boolean;

  constructor() {
    super();

    this.headline = '';
    this.itemStart = '';
    this.itemEnd = null;

    this.disabled = false;
    this.isMenuItem = true;
    this.isListItem = true;
    // NOTE: unlike md-sub-menu-item md-menu-item does not internally set
    // `.active`, so we do not require accessors to synchronize `this.active`
    // with `md-menu-item.active`
    this.active = false;
    this.checked = false;
  }

  // Set item to be placed in `end` slot of menu item (if any).
  // Checked property (check mark) will always take precedence over any icon
  // placed in end slot (if both are specified the checked icon will be used).
  private getEndSlot() {
    if (this.checked) {
      return CHECKED_ICON;
    }
    let endSlot;
    switch (this.itemEnd) {
      case 'shortcut':
        // TODO(b/288231413): expose shortcut text.
        endSlot =
            html`<span slot="end" class="slot-end" id="shortcut">Shortcut</span>`;
        break;
      case 'icon':
        endSlot = html`<cros-icon slot="end" class="slot-end"></cros-icon>`;
        break;
      case 'switch':
        endSlot = html`<cros-switch slot="end" class="slot-end"></cros-switch>`;
        break;
      default:
        // md-list-item has a ::slotted(*) selector which will never select the
        // children of a <slot> or a <slot> itself which is why default content
        // is not set as children of slot.
        // i.e. <slot slot="end">${slotEnd}</slot>
        endSlot = html`<slot slot="end"></slot>`;
        break;
    }
    return endSlot;
  }

  override render() {
    const endSlot = this.getEndSlot();
    // `keep-open` property needs to be true in switch case so cros-switch can
    // be selected/unselected without menu closing.
    const keepOpen = this.itemEnd === 'switch';
    let startSlot = null;
    if (this.itemStart === 'icon') {
      startSlot =
          html`<cros-icon slot="start" data-variant="icon"></cros-icon>`;
    }
    return html`
      <md-menu-item
          headline=${this.headline}
          .keepOpen=${keepOpen}
          .disabled=${this.disabled}
          .active=${this.active}>
        ${startSlot}
        ${endSlot}
      </md-menu-item>
      `;
  }

  // This is just in case `delegatesFocus` doesn't do what is intended (which is
  // unfortunately often across browser updates).
  override focus() {
    this.renderRoot.querySelector('md-menu-item')?.focus();
  }
}

customElements.define('cros-menu-item', MenuItem);

declare global {
  interface HTMLElementTagNameMap {
    'cros-menu-item': MenuItem;
  }
}
