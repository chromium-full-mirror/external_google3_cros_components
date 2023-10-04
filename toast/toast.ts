/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A chromeOS compliant toast. */
export class Toast extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      font: var(--cros-body-2-font);
    }

    #container {
      background-color: var(--cros-sys-inverse_surface);
      border-radius: 12px;
      display: flex;
      padding-inline: 20px;
      padding-top: 16px;
      padding-bottom: 16px;
      width: 336px;
    }

    #message {
      color: var(--cros-sys-surface);
    }
  `;

  /**
   * The visible message on the toast surface.
   * @export
   */
  message: string;

  /** @export */
  override role = 'alert';

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
      <div id="container">
        <div id="message">${this.message}</div>
      </div>
    `;
  }
}

customElements.define('cros-toast', Toast);

declare global {
  interface HTMLElementTagNameMap {
    'cros-toast': Toast;
  }
}
