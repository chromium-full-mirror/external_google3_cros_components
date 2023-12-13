/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/select/select-option.js';

import {MdOutlinedSelect} from '@material/web/select/outlined-select.js';
import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A chromeOS compliant dropdown-option to use within dropdown.
 */
export class DropdownOption extends LitElement {
  /** @nocollapse */
  // TODO: b/296809699 - Fix rtl dropdown option menu positioning.
  static override styles: CSSResultGroup = css`
    :host {
      font: var(--cros-body-0-font);
    }

    md-select-option {
      --md-menu-item-focus-label-text-color: var(--cros-sys-on_surface);
      --md-menu-item-hover-label-text-color: var(--cros-sys-on_surface);
      --md-menu-item-hover-state-layer-color: var(--cros-sys-hover_on_subtle);
      --md-menu-item-hover-state-layer-opacity: 1;
      --md-menu-item-label-text-color: var(--cros-sys-on_surface);
      --md-menu-item-label-text-font: var(--cros-button-2-font-family);
      --md-menu-item-label-text-size: var(--cros-button-2-font-size);
      --md-menu-item-label-text-weight: var(--cros-button-2-font-weight);
      --md-menu-item-pressed-label-text-color: var(--cros-sys-on_surface);
      --md-menu-item-pressed-state-layer-color:var(--cros-sys-on_surface);
      --md-menu-item-pressed-state-layer-opacity: 1;
      --md-menu-item-pressed-state-layer-color: var(--cros-sys-ripple_neutral_on_subtle);
      --md-menu-item-selected-container-color: var(--cros-sys-hover_on_subtle);
      --md-menu-item-selected-label-text-color: var(--cros-sys-on_surface);
    }
  `;

  /** @nocollapse */
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** @nocollapse */
  static override properties = {
    value: {type: String, reflect: true},
  };

  /**
   * The value of the dropdown option.
   * @export
   */
  value: string;

  get mdSelect(): MdOutlinedSelect|null {
    return this.shadowRoot?.querySelector('md-outlined-select') || null;
  }

  constructor() {
    super();
    this.value = '';
  }

  override render() {
    return html`
      <md-select-option value=${this.value}>
        <div slot="headline">${this.value}</div>
      </md-select-option>
    `;
  }
}

customElements.define('cros-dropdown-option', DropdownOption);

declare global {
  interface HTMLElementTagNameMap {
    'cros-dropdown-option': DropdownOption;
  }
}
