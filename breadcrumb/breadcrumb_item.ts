/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {html, LitElement} from 'lit';

/**
 * A cros compliant breadcrumb-item component for use in cros-breadcrumb.
 */
export class BreadcrumbItem extends LitElement {
  override render() {
    return html``;
  }
}

customElements.define('cros-breadcrumb-item', BreadcrumbItem);

declare global {
  interface HTMLElementTagNameMap {
    'cros-breadcrumb-item': BreadcrumbItem;
  }
}
