/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** The visible rendered part of a cros-toast. */
export class ToastItem extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      background-color: var(--cros-sys-inverse_surface);
      border-radius: 12px;
      font: var(--cros-body-2-font);
    }

    #container {
      display: flex;
      padding-bottom: 16px;
      padding-inline: 20px;
      padding-top: 16px;
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

customElements.define('cros-toast-item', ToastItem);

declare global {
  interface HTMLElementTagNameMap {
    'cros-toast-item': ToastItem;
  }
}
