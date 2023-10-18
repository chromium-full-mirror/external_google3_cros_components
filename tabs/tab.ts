/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/tabs/primary-tab';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A chromeOS compliant tab component for use in cros-tabs. */
export class Tab extends LitElement {
  /** @nocollapse */
  // TODO: b/302430637 - Make padding 8px on either side of the label.
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }

    md-primary-tab {
      /** Base styles */
      --md-primary-tab-container-color: transparent;
      --md-primary-tab-container-shape: 8px;
      --md-primary-tab-active-indicator-color: var(--cros-sys-primary);
      --md-primary-tab-active-label-text-color: var(--cros-sys-primary);
      --md-primary-tab-label-text-color: var(--cros-sys-on_surface_variant);
      --md-primary-tab-label-text-font: var(--cros-button-1-font-family);

      /** Hovered */
      --md-primary-tab-active-hover-label-text-color: var(--cros-sys-primary);
      --md-primary-tab-active-hover-state-layer-color: var(--cros-sys-hover_on_subtle);
      --md-primary-tab-active-hover-state-layer-opacity: 1;
      --md-primary-tab-hover-label-text-color: var(--cros-sys-on_surface_variant);
      --md-primary-tab-hover-state-layer-color: var(--cros-sys-hover_on_subtle);
      --md-primary-tab-hover-state-layer-opacity: 1;

      /** Pressed */
      --md-primary-tab-active-pressed-label-text-color: var(--cros-sys-primary);
      --md-primary-tab-active-pressed-state-layer-color: var(--cros-sys-ripple_primary);
      --md-primary-tab-active-pressed-state-layer-opacity: 1;
      --md-primary-tab-pressed-label-text-color: var(--cros-sys-primary);
      --md-primary-tab-pressed-state-layer-color: var(--cros-sys-ripple_primary);
      --md-primary-tab-pressed-state-layer-opacity: 1;
    }
  `;

  /** @nocollapse */
  static override properties = {
    active: {type: Boolean, reflect: true},
    tabName: {type: String},
  };

  active: boolean;
  tabName: string;

  constructor() {
    super();
    this.active = false;
    this.tabName = '';
  }

  override firstUpdated() {
    this.setAttribute('md-tab', 'tab');
  }

  override render() {
    return html`
      <md-primary-tab ?active=${this.active}>
        ${this.tabName}
      </md-primary-tab>
    `;
  }
}

customElements.define('cros-tab', Tab);

declare global {
  interface HTMLElementTagNameMap {
    'cros-tab': Tab;
  }
}
