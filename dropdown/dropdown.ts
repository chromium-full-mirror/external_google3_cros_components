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

  /** @nocollapse */
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** @nocollapse */
  static override properties = {
    disabled: {type: Boolean, reflect: true},
  };

  /** @export */
  disabled: boolean;

  constructor() {
    super();
    this.disabled = false;
  }

  override render() {
    return html`
      <md-outlined-select
          ?disabled=${this.disabled}>
        <slot></slot>
      </md-outlined-select>
    `;
  }
}

customElements.define('cros-dropdown', Dropdown);

declare global {
  interface HTMLElementTagNameMap {
    'cros-dropdown': Dropdown;
  }
}
