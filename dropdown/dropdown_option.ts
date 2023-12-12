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
