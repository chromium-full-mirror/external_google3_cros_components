/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import './toast-item';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A chromeOS compliant toast. */
export class Toast extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`

    :host(:popover-open) {
      border: none;
      padding: 0px;
    }
  `;

  /**
   * The visible message on the toast surface.
   * @export
   */
  message: string;

  /** @export */
  override role = 'alert';

  /** @export */
  override popover = 'manual';

  /** @nocollapse */
  static override properties = {
    message: {type: String, reflect: true},
  };

  constructor() {
    super();
    this.message = '';
  }

  override render() {
    return html`
        <cros-toast-item message=${this.message}></cros-toast-item>
    `;
  }
}

customElements.define('cros-toast', Toast);

declare global {
  interface HTMLElementTagNameMap {
    'cros-toast': Toast;
  }
}
