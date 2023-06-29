/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/button/text-button.js';
import '../icon/icon';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A cros compliant breadcrumb-item component for use in cros-breadcrumb.
 */
export class BreadcrumbItem extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    md-text-button {
      --md-focus-ring-color: var(--cros-sys-focus_ring);
      --md-sys-color-primary: var(--cros-sys-on_surface_variant);
      --md-text-button-container-height: 36px;
      --md-text-button-hover-state-layer-color: var(--cros-sys-hover_on_subtle);
      --md-text-button-hover-state-layer-opacity: 1;
      --md-text-button-label-text-type: var(--cros-typography-title1);
      --md-text-button-pressed-state-layer-color: var(--cros-sys-ripple_neutral_on_subtle);
      --md-text-button-pressed-state-layer-opacity: 1;
    }
    ::slotted(*) {
      width: 20px;
      height: 20px;
      color: var(--cros-sys-on_surface_variant);
    }
  `;
  /** @nocollapse */
  static override properties = {
    label: {type: String},
    variant: {type: String},
  };

  /**
   * @export
   */
  label: string;
  /**
   * @export
   */
  variant: 'text'|'icon';

  constructor() {
    super();
    this.label = '';
    this.variant = 'text';
  }

  override render() {
    if (this.variant === 'icon') {
      return html`<slot></slot>`;
    } else {
      return html`<md-text-button>${this.label}</md-text-button>`;
    }
  }
}

customElements.define('cros-breadcrumb-item', BreadcrumbItem);

declare global {
  interface HTMLElementTagNameMap {
    'cros-breadcrumb-item': BreadcrumbItem;
  }
}
