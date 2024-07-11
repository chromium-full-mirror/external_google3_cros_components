/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A chromeOS compliant accordion. */
export class Accordion extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      font: var(--cros-body-0-font);
    }
  `;

  /** @export */
  label = 'I am a Accordion';

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

customElements.define('cros-accordion', Accordion);

declare global {
  interface HTMLElementTagNameMap {
    'cros-accordion': Accordion;
  }
}
