/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '../icon/icon';
import '@material/web/iconbutton/filled-tonal-icon-button.js';
import '@material/web/iconbutton/standard-icon-button.js';

import {css, CSSResultGroup, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators';

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

  @property({type: String})
  iconButtonStyle: 'filled'|'floating'|'onImage' = 'filled';

  override render() {
    if (this.iconButtonStyle === 'floating') {
      return html`<md-standard-icon-button>
        <slot name="icon"></slot>
      </md-standard-icon-button>`;
    } else {
      // Both filled & onImage use the md-filled-tonal-icon-button.
      return html`<md-filled-tonal-icon-button>
        <slot name="icon"></slot>
      </md-filled-tonal-icon-button>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cros-icon-button': IconButton;
  }
}
