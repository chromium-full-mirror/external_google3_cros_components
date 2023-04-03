/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/menu/menu.js';

import {Corner} from '@material/web/menu/menu.js';
import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A chromeOS menu component.
 * See spec
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?node-id=2650%3A7994&t=01NOG3FTGuaigSvB-0
 */
export class Menu extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
    }
    md-menu {
      --md-focus-ring-color: var(--cros-sys-focus_ring);
      --md-list-container-color: var(--cros-sys-on_primary);
      --md-list-list-item-container-color: var(--cros-sys-on_primary);
      --md-list-list-item-label-text-type: var(--cros-typography-button2);
      --md-list-list-item-one-line-container-height: 36px;
      --md-menu-container-shape: 8px;
      --md-menu-container-surface-tint-layer-color: white;
    }
  `;
  /** @nocollapse */
  static override properties = {
    anchor: {type: Object, attribute: false},
    anchorCorner: {type: String, attribute: 'anchor-corner'},
    hasOverflow: {type: Boolean, attribute: 'has-overflow'},
    open: {type: Boolean},
  };
  /** @nocollapse */
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  anchor: HTMLElement|null;
  anchorCorner: Corner;
  hasOverflow: boolean;
  /**
   * Sets the initial state of the md-menu on first render. In general do not
   * set this and instead use show() and close().
   */
  open: boolean;

  constructor() {
    super();
    this.anchor = null;
    this.anchorCorner = 'END_START';
    this.hasOverflow = false;
    this.open = false;
  }

  override render() {
    return html`
      <md-menu .anchor=${this.anchor} ?open=${this.open} @closed=${
        this.close} ?has-overflow=${this.hasOverflow} anchor-corner=${
        this.anchorCorner} delegatesFocus> <slot></slot>
      </md-menu>
    `;
  }

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }
}

customElements.define('cros-menu', Menu);

declare global {
  interface HTMLElementTagNameMap {
    'cros-menu': Menu;
  }
}
