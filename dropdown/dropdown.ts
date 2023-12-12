/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/select/outlined-select.js';

import {MdOutlinedSelect} from '@material/web/select/outlined-select.js';
import {css, CSSResultGroup, html, LitElement, nothing, PropertyValues} from 'lit';
import {ifDefined} from 'lit/directives/if-defined';

/**
 * A chromeOS compliant dropdown.
 */
export class Dropdown extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
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
    disabled: {type: Boolean, reflect: true},
    error: {type: Boolean, attribute: true},
    errorText: {type: String, attribute: true},
    label: {type: String},
    supportingText: {type: String},
  };

  /** @export */
  disabled: boolean;
  /**
   * The error text shown below the dropdown on `error`. This will override
   * native error messages returned on validation, and is only shown when
   * `error` is set.
   *  @export
   */
  errorText?: string;
  /** @export */
  error: boolean;
  /** @export */
  label?: string;
  /** @export */
  supportingText?: string;

  get mdSelect(): MdOutlinedSelect|null {
    return this.shadowRoot?.querySelector('md-outlined-select') || null;
  }

  constructor() {
    super();
    this.disabled = false;
    this.error = false;
    this.errorText = '';
    this.label = '';
    this.supportingText = '';
  }

  override async firstUpdated() {
    // Run the logic to forward any slotted icons to the md-select internal
    // icon slots.
    this.handleIconChange();
  }

  override update(changedProperties: PropertyValues<Dropdown>) {
    // There is no corresponding 'valid' event to match md-select's
    // 'invalid' event, so just check on every update to see if it's still
    // invalid and remove the class if not.
    if (this.mdSelect && this.classList.contains('error')) {
      this.toggleErrorStyles(this.mdSelect.error);
    }

    super.update(changedProperties);
  }

  override render() {
    const errorTextOrUndef =
        this.error && this.errorText ? this.errorText : undefined;

    return html`
      <md-outlined-select
          ?disabled=${this.disabled}
          ?error=${this.error ?? nothing}
          error-text=${ifDefined(errorTextOrUndef)}
          label=${this.label || ''}
          supporting-text=${this.supportingText || ''}>
        <slot
            name="leading"
            @slotchange=${this.handleIconChange}>
        </slot>
        <slot></slot>
      </md-outlined-select>
    `;
  }

  private toggleErrorStyles(error: boolean) {
    this.classList.toggle('error', error);
  }

  private handleIconChange() {
    // Add the icon to the slot. If there is no slotted icon, remove the empty
    // leadingSlot from the md slot so we return to the original state.
    const leadingSlot = this.shadowRoot!.querySelector('slot[name="leading"]');

    if (this.hasSlottedIcon()) {
      leadingSlot!.setAttribute('slot', 'leading-icon');
    } else {
      leadingSlot!.removeAttribute('slot');
    }
  }

  private hasSlottedIcon() {
    return this.querySelector(`*[slot="leading"]`) !== null;
  }
}

customElements.define('cros-dropdown', Dropdown);

declare global {
  interface HTMLElementTagNameMap {
    'cros-dropdown': Dropdown;
  }
}
