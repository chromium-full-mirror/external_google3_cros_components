/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators';

/**
 * A chromeOS radio component.
 */
@customElement('cros-radio')
export class Radio extends LitElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }
  `;

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cros-radio': Radio;
  }
}
