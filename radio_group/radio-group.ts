/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A chromeOS compliant radio group.
 */
export class RadioGroup extends LitElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }
  `;

  override render() {
    return html`
      <div> Radio group </div>
      `;
  }
}

customElements.define('cros-radio-group', RadioGroup);

declare global {
  interface HTMLElementTagNameMap {
    'cros-radio-group': RadioGroup;
  }
}
