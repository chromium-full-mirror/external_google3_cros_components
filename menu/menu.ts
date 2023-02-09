/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators';

/**
 * A chromeOS menu component.
 */
@customElement('cros-menu')
export class Menu extends LitElement {
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
    'cros-menu': Menu;
  }
}
