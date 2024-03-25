/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A chromeOS compliant badge. */
export class Badge extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      font: var(--cros-body-0-font);
    }
  `;

  /** @export */
  label = 'I am a Badge';

  /** @nocollapse */
  static override properties = {
    label: {type: String, reflect: true},
  };


  override render() {
    return html`
      <div>
        Hello, ${this.label}!
      </div>
    `;
  }
}

customElements.define('cros-badge', Badge);

declare global {
  interface HTMLElementTagNameMap {
    'cros-badge': Badge;
  }
}
