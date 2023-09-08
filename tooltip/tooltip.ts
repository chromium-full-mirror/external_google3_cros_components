/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A cros-compliant tooltip component. */
export class Tooltip extends LitElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }
  `;

  override render() {
    return html``;
  }
}

customElements.define('cros-tooltip', Tooltip);

declare global {
  interface HTMLElementTagNameMap {
    'cros-tooltip': Tooltip;
  }
}
