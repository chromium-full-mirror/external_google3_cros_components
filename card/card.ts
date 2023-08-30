/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/ripple/ripple.js';
import '@material/web/focus/md-focus-ring.js';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A chromeOS compliant card. */
export class Card extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      color: var(--cros-sys-on_surface);
      display: inline-block;
      font: var(--cros-body-0-font);
    }

    /* TODO(b/288189513): Make border color and padding customizable. */
    #container {
      align-items: center;
      background-color: var(--cros-sys-app_base);
      border: 1px solid var(--cros-sys-separator);
      border-radius: 12px;
      box-sizing: border-box;
      --md-focus-ring-color: var(--cros-sys-focus_ring);
      display: grid;
      outline:none;
      padding: var(--cros-card-padding, 16px);
      position: relative;
      --md-focus-ring-shape: 12px;
    }

    /* TODO(b/288189513): Make hover and pressed colors customizable. */
    md-ripple {
      color: var(--cros-sys-ripple_primary);
      --md-ripple-hover-color: var(--cros-sys-hover_on_subtle);
      --md-ripple-hover-opacity: var(--cros-sys-hover_on_subtle);
      /* TODO(b/288189513): cros-sys-neutral_ripple_on_subtle does not exist */
      --md-ripple-pressed-color: var(--cros-sys-neutral_ripple_on_subtle);
    }

    :host([disabled]) {
      opacity: var(--cros-disabled-opacity);
    }
  `;

  /** @nocollapse */
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  /** @export */
  disabled = false;

  /** @nocollapse */
  static override properties = {
    disabled: {type: Boolean, reflect: true},
    tabIndex: {type: Number},
  };

  override render() {
    return html`
        <div id="container" tabindex=${this.tabIndex}>
          <md-ripple
              for="container"
              ?disabled=${this.disabled}>
          </md-ripple>
          <md-focus-ring
              for="container"
              ?disabled=${this.disabled}>
          </md-focus-ring>
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
