/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/menu/menu-item';
import '../icon/icon';
import '../switch/switch';

import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators';

/**
 * A cros compliant menu-item component for use in cros-menu.
 */
@customElement('cros-menu-item')
export class MenuItem extends LitElement {
  // Headline is the primary text of the list item, name follows from
  // md-menu-item.
  @property({type: String}) headline = '';
  @property({type: String}) itemStart: 'icon'|'' = '';
  @property({type: String}) itemEnd: 'shortcut'|'icon'|'switch'|null = null;

  // TODO(b/198759625): Remove negative margin-inline-end when mwc token
  // available (padding 16px)
  static override styles: CSSResultGroup = css`
    :host {
      display: inline block;
    }
    cros-icon {
      width: 20px;
      height: 20px;
    }
    cros-switch {
      width: 32px;
      height: 18px;
    }
    .slot-end {
      margin-inline-end: -8px;
    }
  `;

  override render() {
    let slotEnd;
    switch (this.itemEnd) {
      case 'shortcut':
        // TODO(heidichan): expose shortcut text.
        slotEnd = html`<span class="slot-end">Shortcut</span>`;
        break;
      case 'icon':
        slotEnd = html`<cros-icon class="slot-end"></cros-icon>`;
        break;
      case 'switch':
        slotEnd = html`<cros-switch class="slot-end"></cros-switch>`;
        break;
      default:
        slotEnd = null;
        break;
    }

    const keepOpen = this.itemEnd === 'switch';
    let startItem = null;
    if (this.itemStart === 'icon') {
      startItem =
          html`<cros-icon slot="start" style="margin-left: 16px;"></cros-icon>`;
    }
    // keep-open property needs to be true in switch case so cros-switch can be
    // selected/unselected without menu closing.
    return html`
      <md-menu-item headline=${this.headline} ?keep-open=${keepOpen}>
        ${startItem}
        <slot slot="end">
          ${slotEnd}
        </slot>
      </md-menu-item>
      `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cros-menu-item': MenuItem;
  }
}
