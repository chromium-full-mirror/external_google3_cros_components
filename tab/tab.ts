/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A chromeOS compliant tab. */
export class Tab extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      font: var(--cros-body-0-font);
    }
  `;

  override render() {
    return html``;
  }
}

customElements.define('cros-tab', Tab);

declare global {
  interface HTMLElementTagNameMap {
    'cros-tab': Tab;
  }
}
