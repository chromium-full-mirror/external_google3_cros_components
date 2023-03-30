/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/menu/menu.js';
import '@material/web/menu/sub-menu-item';
import '@material/web/menu/menu-item';
import './menu_item';

import {html, LitElement} from 'lit';

/**
 * ChromeOS menu item which represents an openable submenu.
 * Hovering or clicking element will open a second submenu.
 */
export class SubMenuItem extends LitElement {
  /** @nocollapse */
  static override properties = {
    headline: {type: String},
  };

  /**
   * Headline is the primary text of the list item, name follows
   * from md-menu-item.
   */
  headline: string;

  constructor() {
    super();

    this.headline = '';
  }

  override render() {
    return html`
      <md-sub-menu-item headline=${this.headline}>
        <slot name="submenu" slot="submenu"></slot>
      </md-sub-menu-item>
    `;
  }

  show() {
    if (this.renderRoot.querySelector('md-sub-menu-item') === null) {
      throw new Error(
          'Called show before menu has rendered, maybe try await updateComplete.');
    }
    this.renderRoot.querySelector('md-sub-menu-item')!.show();
  }
}

customElements.define('cros-sub-menu-item', SubMenuItem);

declare global {
  interface HTMLElementTagNameMap {
    'cros-sub-menu-item': SubMenuItem;
  }
}
