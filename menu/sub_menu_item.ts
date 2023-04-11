/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/menu/menu.js';
import '@material/web/menu/sub-menu-item';
import '@material/web/menu/menu-item';
import './menu_item';

import {css, CSSResultGroup, html, LitElement} from 'lit';

// From google3/chrome/apps/common/client/icons/chromeos/ic_chevron-right.svg
const chevronIcon =
    html`<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" slot="end" id="icon">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66669 13.825L10.7872 10L6.66669 6.175L7.93524 5L13.3334 10L7.93524 15L6.66669 13.825Z"/>
    </svg>`;
/**
 * ChromeOS menu item which represents an openable submenu.
 * Hovering or clicking element will open a second submenu.
 */
export class SubMenuItem extends LitElement {
  // TODO(b/276045973): Currently elevation layer is on top of selected state
  // color making it darker than hover. Per chrome spec we want hover/selected
  // to be the same. Once opacities are flattened & colors updated, update
  // screenshot tests for components. For now we remove color altogether for
  // selected state.
  static override styles: CSSResultGroup = css`
    md-sub-menu-item {
      --md-menu-list-item-selected-container-color: #00000000;
    }
    :host-context(html[dir=rtl]) #icon {
      transform: scaleX(-1);
    }
  `;

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
    return html` <md-sub-menu-item headline = ${this.headline}>
      ${chevronIcon}<slot name='submenu' slot='submenu'></slot>
      </md-sub-menu-item>`;
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
