/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/iconbutton/filled-tonal-icon-button.js';
import '../menu/menu';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** The SVG to use in the trailing icon slot when the dropdown is closed. */
const ARROW_DROP_DOWN_SVG = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960">
    <path d="M480-376.348 274.848-581.5h410.304L480-376.348Z"/>
  </svg>`;

/** A chromeOS compliant icon-dropdown. */
export class IconDropdown extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-block;
      font: var(--cros-body-0-font);
    }

    .button-icon-container {
      display: flex;
      place-content: center;
    }

    .button-icon-container .dropdown-arrow {
      /* 5px overlap with the button icon. */
      margin-inline: -5px 1px;
    }

    .button-icon-container .dropdown-icon {
      margin-inline: 4px 0;
    }

    md-filled-tonal-icon-button {
      --md-filled-tonal-icon-button-icon-size: 20px;
      --md-filled-tonal-icon-button-container-height: 40px;
      --md-filled-tonal-icon-button-container-shape: 12px;
      --md-filled-tonal-icon-button-container-width: 40px;
    }
  `;

  /** @nocollapse */
  static override properties = {
    ariaLabel: {type: String, reflect: true, attribute: 'aria-label'},
  };

  override render() {
    return html`
      <div>
        ${this.renderButtonContent()}
        ${this.renderMenuContent()}
      </div>
    `;
  }

  private renderButtonContent() {
    return html`
      <md-filled-tonal-icon-button id="button" aria-label=${
        this.ariaLabel ?? ''}>
        <div class="button-icon-container">
          <span class="dropdown-icon"><slot name="button-icon"></slot></span>
          <span class="dropdown-arrow">${ARROW_DROP_DOWN_SVG}</span>
        </div>
      </md-filled-tonal-icon-button>
    `;
  }

  private renderMenuContent() {
    return html`
      <cros-menu anchor="button">
      </cros-menu>
    `;
  }
}

customElements.define('cros-icon-dropdown', IconDropdown);

declare global {
  interface HTMLElementTagNameMap {
    'cros-icon-dropdown': IconDropdown;
  }
}
