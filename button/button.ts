/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/button/filled-button.js';

import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators';

/**
 * A chromeOS compliant button.
 * See spec
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?node-id=2116%3A4082&t=kbaCFk5KdayGTyuL-0
 */
@customElement('cros-button')
export class Button extends LitElement {
  // TODO(b/258982831): Centre icon. See spec.
  static override styles: CSSResultGroup = css`
    md-filled-button {
      max-width: 200px;
      min-width: 64px;
      --md-filled-button-container-height: 36px;
      --md-filled-button-with-icon-icon-size: 20px;
      --md-sys-color-primary: var(--cros-sys-primary);
      --md-sys-color-on-primary: var(--cros-sys-on_primary);
      --md-filled-button-with-icon-icon-color: var(--cros-sys-on_primary);
      --md-filled-button-hover-state-layer-color: var(--cros-sys-hover_on_prominent);
      --md-filled-button-pressed-state-layer-color: var(--cros-sys-hover_on_prominent);
      --md-filled-button-focus-state-layler-color: var(--cros-sys-focus_ring);
      --md-filled-button-disabled-container-color: var(--cros-sys-disabled_container);
      --md-filled-button-disabled-clabel-text-color: var(--cros-sys-disabled);
      --md-filled-button-with-icon-disabled-icon-color: var(--cros-sys-disabled);
    }
  `;

  @property({type: String}) label = '';
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) trailingIcon = false;

  override render() {
    return html`
        <md-filled-button label=${this.label}
            ?disabled=${this.disabled}
            ?trailingIcon=${this.trailingIcon}>
          <slot slot="icon" name="icon"></slot>
        </md-filled-button>
        `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cros-button': Button;
  }
}
