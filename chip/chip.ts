/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import 'google3/third_party/javascript/material/web/chips/filter-chip.js';

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
    md-filter-chip {
      --md-filter-chip-icon-size: 20px;
      --md-filter-chip-label-text-type: var(--cros-typography-button1);
      --md-filter-chip-leading-icon-color: var(--cros-sys-on_surface);
      --md-filter-chip-outline-color: var(--cros-sys-separator);
      --md-filter-chip-selected-container-color: var(--cros-sys-secondary_container);
      --md-filter-chip-selected-label-text-color: var(--cros-sys-on_secondary_container);
      --md-filter-chip-selected-leading-icon-color: var(--cros-sys-on_secondary_container);
      --md-filter-chip-selected-outline-width: 1px;
      --md-filter-chip-selected-trailing-icon-color: var(--cros-sys-on_secondary_container);
      --md-filter-chip-trailing-icon-color: var(--cros-sys-on_surface);
      }
  `;

  override render() {
    return html`
      <md-filter-chip label="Label">
        <slot slot="icon" name="icon"></slot>
      </md-filter-chip>
      `;
  }
}

customElements.define('cros-chip', Chip);

declare global {
  interface HTMLElementTagNameMap {
    'cros-chip': Chip;
  }
}
