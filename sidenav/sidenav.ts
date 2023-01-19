/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators';

import {SidenavItem} from './sidenav_item';

/**
 * A ChromeOS compliant sidenav.
 * TODO(b/262453851): Implement this.
 */
@customElement('cros-sidenav')
export class Sidenav extends LitElement {
  static override styles: CSSResultGroup = css`
    `;

  selectedItem: SidenavItem|null = null;

  override render() {
    return html`
        <slot></slot>
      `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cros-sidenav': Sidenav;
  }
}
