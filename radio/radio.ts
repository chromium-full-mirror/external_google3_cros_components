/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/radio/radio.js';

import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators';

/**
 * A chromeOS compliant radio button.
 * See spec
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?node-id=2673%3A11119
 */
@customElement('cros-radio')
export class Radio extends LitElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }
    md-radio {
      --md-sys-color-primary: var(--cros-sys-primary);
      --md-sys-color-on-surface: var(--cros-sys-on_surface);
      --md-ripple-pressed-state-layer-color: var(--cros-sys-ripple_primary);
      --md-ripple-pressed-state-layer-opacity: 32%;
      --md-focus-ring-color: var(--cros-sys-primary);
    }
  `;

  @property({type: Boolean}) disabled = false;

  override render() {
    return html`
      <md-radio ?disabled=${this.disabled}></md-radio>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cros-radio': Radio;
  }
}
