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
 * Dropdowns have two variants that differ only by the container background,
 * designed to improve contrast depending on the color of the surface behind it:
 * 1) dropdown-on-app-base (lighter background, app base)
 * 2) dropdown-on-shaded (darker background, shaded base)
 *
 * Consumers of the component can use the `shaded` property to ensure that it
 * has the correct container color for their use case.
 */
const DROPDOWN_CONTAINER_ON_BASE = css`var(--cros-sys-input_field_on_base)`;
const DROPDOWN_CONTAINER_ON_SHADED = css`var(--cros-sys-input_field_on_shaded)`;

const CROS_DROPDOWN_OUTLINE_WIDTH = 2;

/**
 * A chromeOS compliant dropdown.
 */
export class Dropdown extends LitElement {
  /** @nocollapse */
  // TODO: b/315895240 - Fix height of dropdown to 36px;
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }

    :host([disabled]) .text-labels {
      opacity: var(--cros-disabled-opacity);
    }

    md-outlined-select {
      /* Base styles */
      --md-outlined-select-text-field-container-shape: 8px;
      --md-outlined-select-text-field-container-color: ${
      DROPDOWN_CONTAINER_ON_BASE};
      --md-outlined-select-text-field-outline-width: 0px;

      --md-outlined-select-text-field-input-text-color: var(--cros-sys-on_surface);
      --md-outlined-select-text-field-input-text-font: var(--cros-body-2-font-family);
      --md-outlined-select-text-field-input-text-line-height: var(--cros-body-2-line-height);
      --md-outlined-select-text-field-input-text-size: var(--cros-body-2-font-size);
      --md-outlined-select-text-field-input-text-weight: var(--cros-body-2-font-weight);

      --md-outlined-select-text-field-supporting-text-color: var(--cros-sys-on_surface);
      --md-outlined-select-text-field-supporting-text-font: var(--cros-label-2-font-family);
      --md-outlined-select-text-field-supporting-text-line-height: var(--cros-label-2-line-height);
      --md-outlined-select-text-field-supporting-text-size: var(--cros-label-2-font-size);
      --md-outlined-select-text-field-supporting-text-weight: var(--cros-label-2-font-weight);

      /* Error */
      --md-outlined-select-text-field-error-focus-outline-color: var(--cros-sys-error);
      --md-outlined-select-text-field-error-hover-state-layer-opacity: 0;
      --md-outlined-select-text-field-error-hover-supporting-text-color: var(--cros-sys-error);
      --md-outlined-select-text-field-error-supporting-text-color: var(--cros-sys-error);

      /* Focus */
      --md-outlined-select-text-field-focus-leading-icon-color: var(--cros-sys-secondary);
      --md-outlined-select-text-field-focus-outline-color: var(--cros-sys-focus_ring);
      --md-outlined-select-text-field-focus-outline-width: ${
      CROS_DROPDOWN_OUTLINE_WIDTH}px;

      /* Hover */
      --md-outlined-select-text-field-hover-outline-width: 0px;
      --md-outlined-select-text-field-hover-supporting-text-color: var(--cros-sys-on_surface);
      --md-outlined-select-text-field-hover-state-layer-opacity: 0;
    }

   .text-labels {
      color: var(--cros-sys-on_surface);
    }

    :host(.focused) .text-labels {
      color: var(--cros-sys-primary);
    }

    #visible-label {
      font: var(--cros-label-1-font);
      padding-bottom: 8px;
      padding-inline-start: ${CROS_DROPDOWN_OUTLINE_WIDTH}px;
    }

    #main-container {
      position: relative;
    }

    #dropdown-background {
      background-color: ${DROPDOWN_CONTAINER_ON_BASE};
      border-radius: 8px;
      left: ${CROS_DROPDOWN_OUTLINE_WIDTH}px;
      min-height: 48px;
      position: absolute;
      right: ${CROS_DROPDOWN_OUTLINE_WIDTH}px;
      top: ${CROS_DROPDOWN_OUTLINE_WIDTH}px;
    }

    :host([shaded]) #dropdown-background {
      background-color: ${DROPDOWN_CONTAINER_ON_SHADED};
    }

    /**
     * Some md styling can override the color provided to the md-select, so we
     * explicitly set it here as well.
     */
    ::slotted(svg) {
      fill: var(--cros-sys-secondary);
    }

    ::slotted(*) {
      color: var(--cros-sys-secondary);
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
    shaded: {type: Boolean, reflect: true},
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

  /**
   * The visible label above the dropdown.
   * @export
   */
  label: string;

  /**
   * When false, will use the darker container designed to sit on app-base. When
   * true, will use the lighter container colored designed for use with
   * app-base-shaded. Purely a cosmetic difference to improve contrast.
   * @export
   */
  shaded = false;

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
    this.shaded = false;
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
      ${this.maybeRenderLabel()}
      <div id="main-container">
        <div id="dropdown-background"></div>
        <md-outlined-select
            ?disabled=${this.disabled}
            ?error=${this.error ?? nothing}
            error-text=${ifDefined(errorTextOrUndef)}
            supporting-text=${this.supportingText || ''}>
          <slot
              name="leading"
              @slotchange=${this.handleIconChange}>
          </slot>
          <slot></slot>
        </md-outlined-select>
      </div>
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

  private maybeRenderLabel() {
    return this.label ?
        html`<div id="visible-label" class="text-labels">${this.label}</div>` :
        nothing;
  }
}

customElements.define('cros-dropdown', Dropdown);

declare global {
  interface HTMLElementTagNameMap {
    'cros-dropdown': Dropdown;
  }
}
