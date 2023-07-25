/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * A ChromeOS compliant tag.
 * See spec
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?type=design&node-id=9644-165677&mode=design&t=0xBcgechLxIMCLG0-0
 */
export class Tag extends LitElement {
  static height = 32;
  static padding = 12;
  static radius = 8;
  /** @export */
  onBase: boolean;

  /** @nocollapse */
  static override properties = {
    onBase: {type: Boolean, reflect: true, attribute: 'on-base'},
  };

  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      align-items: center;
      background: var(--cros-tag-surface-color, var(--cros-sys-app_base));
      border-radius: ${Tag.radius}px;
      color: var(--cros-sys-on_surface);
      display: flex;
      font: var(--cros-button-2-font);
      height: ${Tag.height}px;
      margin: 0;
      padding: 0 ${Tag.padding}px;
      text-align: center;
    }
    :host([on-base]) {
      background: var(--cros-tag-surface-color, var(--cros-sys-hover_on_subtle));
    }
    `;

  constructor() {
    super();
    this.onBase = false;
  }

  override render() {
    return html`
      <div><slot></slot></div>
    `;
  }
}

customElements.define('cros-tag', Tag);

declare global {
  interface HTMLElementTagNameMap {
    'cros-tag': Tag;
  }
}
