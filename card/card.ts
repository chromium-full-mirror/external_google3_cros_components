/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A chromeOS compliant card. */
export class Card extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
      :host {
        display: inline-block;
        font: var(--cros-body-0-font);
      }

      div {
        /* TODO(b/288189513) Customisable border colour */
        border: 1px solid var(--cros-sys-separator);
        /* TODO(b/288189513) Customisable */
        background-color: var(--cros-sys-app_base);
        border-radius: 12px;
        padding: var(--cros-card-padding, 16px);
      }

      div:hover {
        /* TODO Customisable */
        background-color: var(--cros-sys-hover_on_subtle);
      }

      /* TODO(b/288189513) Pressed */
      /* TODO(b/288189513) Focus */
      /* TODO(b/288189513) Disabled */
  `;

  /** @export */
  disabled = false;

  /** @nocollapse */
  static override properties = {
    disabled: {type: Boolean, reflect: true},
  };


  override render() {
    return html`
        <div>
          <slot></slot>
        </div>
    `;
  }
}

customElements.define('cros-card', Card);

declare global {
  interface HTMLElementTagNameMap {
    'cros-card': Card;
  }
}
