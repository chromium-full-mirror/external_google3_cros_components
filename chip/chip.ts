/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import 'google3/third_party/javascript/material/web/chips/filter-chip.js';
import 'google3/third_party/javascript/material/web/chips/input-chip.js';
import 'google3/third_party/javascript/material/web/chips/suggestion-chip.js';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A cros-compliant chip component.
 * See spec:
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?node-id=3167%3A23000&t=ndVwslDMK3OwbNXW-0
 */
export class Chip extends LitElement {
  /** @export */
  disabled: boolean;
  /** @export */
  selected: boolean;
  /** @export */
  label: string;
  /** @export */
  type: 'filter'|'input';
  /**
   * Input chips can have a trailing icon (to close chip) or not.
   * @export
   */
  trailingIcon: boolean;

  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }

    md-filter-chip {
      --md-filter-chip-disabled-label-text-color: var(--cros-sys-on_surface);
      --md-filter-chip-disabled-label-text-opacity: var(--cros-sys-opacity-disabled);
      --md-filter-chip-disabled-leading-icon-color: var(--cros-sys-disabled);
      --md-filter-chip-disabled-leading-icon-opacity: var(--cros-sys-opacity-disabled);
      --md-filter-chip-disabled-outline-color: var(--cros-sys-separator);
      --md-filter-chip-disabled-outline-opacity: var(--cros-sys-opacity-disabled);
      --md-filter-chip-disabled-selected-container-color: var(--cros-sys-disabled_container);
      --md-filter-chip-disabled-selected-container-opacity: var(--cros-sys-opacity-disabled);
      --md-filter-chip-disabled-trailing-icon-color: var(--cros-sys-disabled);
      --md-filter-chip-disabled-trailing-icon-opacity: var(--cros-sys-opacity-disabled);
      --md-filter-chip-focus-label-text-color: var(--cros-sys-on_surface);
      --md-filter-chip-focus-leading-icon-color: var(--cros-sys-on_surface);
      --md-filter-chip-focus-trailing-icon-color: var(--cros-sys-on_surface);
      --md-filter-chip-hover-label-text-color: var(--cros-sys-on_surface);
      --md-filter-chip-hover-leading-icon-color: var(--cros-sys-on_surface);
      --md-filter-chip-hover-trailing-icon-color: var(--cros-sys-on_surface);
      --md-filter-chip-hover-state-layer-color: var(--cros-sys-hover_on_subtle);
      --md-filter-chip-hover-state-layer-opacity: 1;
      --md-filter-chip-icon-size: 20px;
      --md-filter-chip-label-text-type: var(--cros-typography-button1);
      --md-filter-chip-leading-icon-color: var(--cros-sys-on_surface);
      --md-filter-chip-outline-color: var(--cros-sys-separator);
      --md-filter-chip-pressed-label-text-color: var(--cros-sys-on_surface);
      --md-filter-chip-pressed-leading-icon-color: var(--cros-sys-on_surface);
      --md-filter-chip-pressed-trailing-icon-color: var(--cros-sys-on_surface);
      --md-filter-chip-pressed-state-layer-color: var(--cros-sys-ripple_neutral_on_subtle);
      --md-filter-chip-pressed-state-layer-opacity: 1;
      --md-filter-chip-selected-container-color: var(--cros-sys-secondary_container);
      --md-filter-chip-selected-hover-state-layer-color: var(--cros-sys-hover_on_subtle);
      --md-filter-chip-selected-hover-state-layer-opacity: 1;
      --md-filter-chip-selected-label-text-color: var(--cros-sys-on_secondary_container);
      --md-filter-chip-selected-leading-icon-color: var(--cros-sys-on_secondary_container);
      --md-filter-chip-selected-outline-width: 1px;
      --md-filter-chip-selected-pressed-state-layer-color: var(--cros-sys-ripple_neutral_on_subtle);
      --md-filter-chip-selected-pressed-state-layer-opacity: 1;
      --md-filter-chip-selected-trailing-icon-color: var(--cros-sys-on_secondary_container);
      --md-filter-chip-trailing-icon-color: var(--cros-sys-on_surface);
      --md-focus-ring-color: var(--cros-sys-focus_ring);
    }

    md-suggestion-chip {
      --md-suggestion-chip-disabled-label-text-color: var(--cros-sys-on_surface);
      --md-suggestion-chip-disabled-label-text-opacity: var(--cros-sys-opacity-disabled);
      --md-suggestion-chip-disabled-leading-icon-color: var(--cros-sys-disabled);
      --md-suggestion-chip-disabled-leading-icon-opacity: var(--cros-sys-opacity-disabled);
      --md-suggestion-chip-disabled-outline-color: var(--cros-sys-separator);
      --md-suggestion-chip-disabled-outline-opacity: var(--cros-sys-opacity-disabled);
      --md-suggestion-chip-focus-label-text-color: var(--cros-sys-on_surface);
      --md-suggestion-chip-focus-leading-icon-color: var(--cros-sys-on_surface);
      --md-suggestion-chip-hover-label-text-color: var(--cros-sys-on_surface);
      --md-suggestion-chip-hover-leading-icon-color: var(--cros-sys-on_surface);
      --md-suggestion-chip-hover-state-layer-color: var(--cros-sys-hover_on_subtle);
      --md-suggestion-chip-hover-state-layer-opacity: 1;
      --md-suggestion-chip-icon-size: 20px;
      --md-suggestion-chip-label-text-type: var(--cros-typography-button1);
      --md-suggestion-chip-leading-icon-color: var(--cros-sys-on_surface);
      --md-suggestion-chip-outline-color: var(--cros-sys-separator);
      --md-suggestion-chip-pressed-label-text-color: var(--cros-sys-on_surface);
      --md-suggestion-chip-pressed-leading-icon-color: var(--cros-sys-on_surface);
      --md-suggestion-chip-pressed-state-layer-color: var(--cros-sys-ripple_neutral_on_subtle);
      --md-suggestion-chip-pressed-state-layer-opacity: 1;
      --md-focus-ring-color: var(--cros-sys-focus_ring);
    }
  `;

  /** @nocollapse */
  static override properties = {
    disabled: {type: Boolean},
    selected: {type: Boolean},
    label: {type: String},
    type: {type: String},
    trailingIcon: {type: Boolean},
  };

  constructor() {
    super();
    this.disabled = false;
    this.selected = false;
    this.type = 'filter';
    this.trailingIcon = false;
    this.label = '';
  }

  override render() {
    if (this.type === 'filter') {
      return html`
        <md-filter-chip
            label=${this.label}
            ?disabled=${this.disabled}
            ?selected=${this.selected}>
          <slot slot='icon' name='icon'></slot>
        </md-filter-chip>
        `;
    } else {
      if (!this.trailingIcon) {
        return html`
          <md-suggestion-chip
              label=${this.label}
              ?disabled=${this.disabled}
              ?selected=${this.selected}>
            <slot slot='icon' name='icon'></slot>
          </md-suggestion-chip>
        `;
      } else {
        return html`
          <md-input-chip
              label=${this.label}
              ?disabled=${this.disabled}
              ?selected=${this.selected}>
            <slot slot='icon' name='icon'></slot>
          </md-input-chip>
        `;
      }
    }
  }
}

customElements.define('cros-chip', Chip);

declare global {
  interface HTMLElementTagNameMap {
    'cros-chip': Chip;
  }
}
