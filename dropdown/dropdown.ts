/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/select/outlined-select.js';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A chromeOS compliant dropdown.
 */
export class Dropdown extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      font: var(--cros-body-0-font);
    }
  `;

  override render() {
    return html`
      <md-outlined-select></md-outlined-select>
    `;
  }
}

customElements.define('cros-dropdown', Dropdown);

declare global {
  interface HTMLElementTagNameMap {
    'cros-dropdown': Dropdown;
  }
}
