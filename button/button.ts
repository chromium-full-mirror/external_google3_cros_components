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
  // TODO(b/241022309): Replace hardcoded colours with theme variables.
  static override styles: CSSResultGroup = css`
    md-filled-button {
      --md-sys-color-primary: var(--cros-button-fill, #3F5AA9);
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
