/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '../card/card';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A chromeOS compliant accordion. */
export class Accordion extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
      cros-card {
        --cros-card-padding: 0;
      }

      ::slotted(cros-accordion-item:last-of-type) {
        --cros-accordion-item-separator-display: none;
      }
  `;

  override render() {
    return html`
      <cros-card cardStyle="outline">
        <slot></slot>
      </cros-card>
    `;
  }
}

customElements.define('cros-accordion', Accordion);

declare global {
  interface HTMLElementTagNameMap {
    'cros-accordion': Accordion;
  }
}
