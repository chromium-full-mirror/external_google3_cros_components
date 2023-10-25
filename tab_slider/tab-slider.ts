/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A chromeOS compliant tab-slider.
 *
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?type=design&node-id=2852-19308&mode=design&t=uXwuM7QRyBvvkmwP-0
 */
export class TabSlider extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      font: var(--cros-body-0-font);
    }
  `;

  /** @export */
  label = 'I am a TabSlider';

  /** @nocollapse */
  static override properties = {
    name: {type: String, reflect: true},
  };


  override render() {
    return html`
      <div>
        Hello, ${this.label}!
      </div>
    `;
  }
}

customElements.define('cros-tab-slider', TabSlider);

declare global {
  interface HTMLElementTagNameMap {
    'cros-tab-slider': TabSlider;
  }
}
