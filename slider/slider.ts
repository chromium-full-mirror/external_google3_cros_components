/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/slider/slider.js';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A cros compliant slider component.
 * See spec:
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?node-id=2978%3A19626
 */
export class Slider extends LitElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }
    md-slider {
      --md-focus-ring-color: var(--cros-sys-primary);
      --md-slider-active-track-color: var(--cros-sys-primary);
      --md-slider-inactive-track-color: var(--cros-sys-primary_container);
      --md-slider-handle-color: var(--cros-sys-primary);
      --md-slider-handle-height: 12px;
      --md-slider-handle-width: 12px;
      --md-slider-hover-state-layer-opacity: 0;
      --md-slider-disabled-active-track-color: var(--cros-sys-disabled);
      --md-slider-disabled-handle-color: var(--cros-sys-disabled);
      --md-slider-disabled-inactive-track-color: var(--cros-sys-disabled);
      --md-slider-pressed-state-layer-color: var(--cros-sys-ripple_primary);
      --md-slider-pressed-state-layer-opacity: 1;
    }
  `;

  /** @nocollapse */
  static override properties = {
    value: {type: Number},
    disabled: {type: Boolean},
  };

  value: number;
  disabled: boolean;

  constructor() {
    super();
    this.value = 0;
    this.disabled = false;
  }

  override render() {
    return html`
      <md-slider value=${this.value} ?disabled=${this.disabled}></md-slider>
    `;
  }
}

customElements.define('cros-slider', Slider);

declare global {
  interface HTMLElementTagNameMap {
    'cros-slider': Slider;
  }
}
