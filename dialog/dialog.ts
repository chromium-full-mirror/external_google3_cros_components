/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/dialog/dialog.js';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A chromeOS compliant dialog.
 *
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?node-id=4733%3A70425&t=sT1EGkVc7oaEEHMC-0
 */
export class Dialog extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }
    md-dialog {
      --md-dialog-container-color: var(--cros-sys-dialog_container);
      --md-dialog-container-shape: 20px;
      --md-dialog-headline-color: var(--cros-sys-on_surface);
      --md-dialog-headline-font: var(--cros-display-7-font);
      --md-dialog-supporting-text-color: var(--cros-sys-on_surface_variant);
      --md-dialog-supporting-text-font: var(--cros-body-1-font);
      }
  `;

  override render() {
    return html`
      <md-dialog>
        <slot slot="headline" name="headline"></slot>
        <slot slot="content" name="content"></slot>
        <slot slot="actions" name="actions" class="footer"></slot>
      </md-dialog>
    `;
  }

  show() {
    this.shadowRoot!.querySelector('md-dialog')!.show();
  }

  close() {
    this.shadowRoot!.querySelector('md-dialog')!.close();
  }
}

customElements.define('cros-dialog', Dialog);

declare global {
  interface HTMLElementTagNameMap {
    'cros-dialog': Dialog;
  }
}
