/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/menu/menu-item';
import '../icon/icon';
import '../switch/switch';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A cros compliant menu-item component for use in cros-menu.
 */
export class MenuItem extends LitElement {
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
  `;
  /** @nocollapse */
  static override properties = {
    headline: {type: String},
    itemStart: {type: String},
    itemEnd: {type: String},
  };

  /**
   * Headline is the primary text of the list item, name follows from
   * md-menu-item.
   */
  headline: string;
  itemStart: 'icon'|'';
  itemEnd: 'shortcut'|'icon'|'switch'|null;

  constructor() {
    super();

    this.headline = '';
    this.itemStart = '';
    this.itemEnd = null;
  }

  override render() {
    let slotEnd;
    switch (this.itemEnd) {
      case 'shortcut':
        // TODO(heidichan): expose shortcut text.
        slotEnd =
            html`<span slot="end" class="slot-end" id="shortcut">Shortcut</span>`;
        break;
      case 'icon':
        slotEnd = html`<cros-icon slot="end" class="slot-end"></cros-icon>`;
        break;
      case 'switch':
        slotEnd = html`<cros-switch slot="end" class="slot-end"></cros-switch>`;
        break;
      default:
        // md-list-item has a ::slotted(*) selector which will never select the
        // children of a <slot> or a <slot> itself which is why default content
        // is not set as children of slot.
        // i.e. <slot slot="end">${slotEnd}</slot>
        slotEnd = html`<slot slot="end"></slot>`;
        break;
    }

    const keepOpen = this.itemEnd === 'switch';
    let startItem = null;
    if (this.itemStart === 'icon') {
      startItem =
          html`<cros-icon slot="start" data-variant="icon"></cros-icon>`;
    }
    // keep-open property needs to be true in switch case so cros-switch can be
    // selected/unselected without menu closing.
    return html`
      <md-menu-item headline=${this.headline} ?keep-open=${keepOpen}>
        ${startItem}
        ${slotEnd}
      </md-menu-item>
      `;
  }
}

customElements.define('cros-menu-item', MenuItem);

declare global {
  interface HTMLElementTagNameMap {
    'cros-menu-item': MenuItem;
  }
}
