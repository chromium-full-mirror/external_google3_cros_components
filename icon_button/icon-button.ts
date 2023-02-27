/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators';

/**
 * A cros compliant icon-button component.
 * See spec:
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?node-id=2447%3A5928
 */
@customElement('cros-icon-button')
export class IconButton extends LitElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }
  `;

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cros-icon-button': IconButton;
  }
}
