/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A cros compliant breadcrumb component.
 * See spec:
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?node-id=3669%3A53793&t=6W7VqUU0nkApOSgg-0
 */
export class Breadcrumb extends LitElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }
  `;

  override render() {
    return html``;
  }
}

customElements.define('cros-breadcrumb', Breadcrumb);

declare global {
  interface HTMLElementTagNameMap {
    'cros-breadcrumb': Breadcrumb;
  }
}
