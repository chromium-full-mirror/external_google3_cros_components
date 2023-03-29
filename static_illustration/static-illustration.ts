/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {html, LitElement} from 'lit';

/** A static illustration for SVG illustrations. */
export class StaticIllustration extends LitElement {
  override render() {
    return html`TBD`;
  }
}

customElements.define('cros-static-illustration', StaticIllustration);

declare global {
  interface HTMLElementTagNameMap {
    'cros-static-illustration': StaticIllustration;
  }
}
