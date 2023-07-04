/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A cros-compliant chip component.
 * See spec:
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?node-id=3167%3A23000&t=ndVwslDMK3OwbNXW-0
 */
export class Chip extends LitElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }
  `;

  override render() {
    return html``;
  }
}

customElements.define('cros-chip', Chip);

declare global {
  interface HTMLElementTagNameMap {
    'cros-chip': Chip;
  }
}
