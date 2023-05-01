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
  // TODO(b/279854770): check disabled styling.
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }
    md-slider {
      --disabled-color: var(-cros-ref-neutral10);
      --md-focus-ring-color: var(--cros-sys-primary);
      --md-slider-active-track-color: var(--cros-sys-primary);
      --md-slider-disabled-active-track-color: var(--disabled-color);
      --md-slider-disabled-active-track-opacity: var(--cros-sys-opacity-disabled);
      --md-slider-disabled-handle-color: var(--disabled-color);
      --md-slider-disabled-inactive-track-color: var(--disabled-color);
      --md-slider-disabled-inactive-track-opacity: var(--cros-sys-opacity-disabled);
      --md-slider-focus-handle-color: var(--cros-sys-primary);
      --md-slider-handle-color: var(--cros-sys-primary);
      --md-slider-handle-height: 12px;
      --md-slider-handle-width: 12px;
      --md-slider-hover-handle-color: var(--cros-sys-primary);
      --md-slider-hover-state-layer-opacity: 0;
      --md-slider-inactive-track-color: var(--cros-sys-primary_container);
      --md-slider-label-container-color: var(--cros-sys-primary);
      --md-slider-label-container-height: 18px;
      --md-slider-label-label-text-color: var(--cros-sys-on_primary);
      --md-slider-label-label-text-type: var(--cros-typography-label2);
      --md-slider-pressed-handle-color: var(--cros-sys-primary);
      --md-slider-pressed-state-layer-color: var(--cros-sys-ripple_primary);
      --md-slider-pressed-state-layer-opacity: 1;
      --md-slider-state-layer-size: 28px;
      --md-slider-with-tick-marks-active-container-color: var(--cros-sys-on_primary);
      --md-slider-with-tick-marks-disabled-container-color: var(--disabled-color);
      --md-slider-with-tick-marks-inactive-container-color: var(--cros-sys-primary);
    }
  `;

  /** @nocollapse */
  static override properties = {
    value: {type: Number},
    disabled: {type: Boolean},
    withTickMarks: {type: Boolean},
  };

  value: number;
  disabled: boolean;
  withTickMarks: boolean;

  constructor() {
    super();
    this.value = 0;
    this.disabled = false;
    this.withTickMarks = false;
  }

  override render() {
    return html`
      <md-slider value=${this.value} ?disabled=${
        this.disabled} ?withTickMarks=${this.withTickMarks}></md-slider>
    `;
  }
}

customElements.define('cros-slider', Slider);

declare global {
  interface HTMLElementTagNameMap {
    'cros-slider': Slider;
  }
}
