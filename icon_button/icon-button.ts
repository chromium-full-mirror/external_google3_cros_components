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
    md-filled-tonal-icon-button {
      --md-filled-tonal-icon-button-icon-size: 20px;
      --md-filled-tonal-icon-button-container-size: 40px;
      --md-filled-tonal-icon-button-container-shape: 12px;
      --md-filled-tonal-icon-button-container-color: var(--cros-sys-surface_variant);
      --md-filled-tonal-icon-button-icon-color: var(--cros-sys-on_surface);
      --md-filled-tonal-icon-button-focus-icon-color: var(--cros-sys-on_surface);
      --md-filled-tonal-icon-button-hover-icon-color: var(--cros-sys-on_surface);
      --md-filled-tonal-icon-button-pressed-icon-color: var(--cros-sys-on_surface);
      --md-filled-tonal-icon-button-selected-focus-icon-color: var(--cros-sys-on_surface);
      --md-filled-tonal-icon-button-selected-pressed-icon-color: var(--cros-sys-on_surface);
    }
    md-standard-icon-button {
      --md-icon-button-icon-size: 20px;
      --md-icon-button-state-layer-size: 40px;
      --md-icon-button-state-layer-shape: 12px;
      --md-icon-button-unselected-icon-color: var(--cros-sys-on_surface);
      --md-icon-button-selected-focus-icon-color: var(--cros-sys-on_surface);
      --md-icon-button-selected-hover-icon-color: var(--cros-sys-on_surface);
      --md-icon-button-selected-icon-color: var(--cros-sys-on_surface);
      --md-icon-button-selected-pressed-icon-color: var(--cros-sys-on_surface);
      --md-icon-button-unselected-pressed-icon-color: var(--cros-sys-on_surface);
      --md-icon-button-unselected-focus-icon-color: var(--cros-sys-on_surface);
      --md-icon-button-unselected-hover-icon-color: var(--cros-sys-on_surface);
    }
    md-standard-icon-button.small {
      --md-icon-button-icon-size: 16px;
      --md-icon-button-state-layer-size: 32px;
      --md-icon-button-state-layer-shape: 100%;
    }
    md-standard-icon-button.large {
      --md-icon-button-icon-size: 24px;
      --md-icon-button-state-layer-shape: 16px;
      height: 64px;
      width: 80px;
      margin: 0;
    }
    md-filled-tonal-icon-button.small {
      --md-filled-tonal-icon-button-icon-size: 16px;
      --md-filled-tonal-icon-button-container-size: 32px;
      --md-filled-tonal-icon-button-container-shape: 100%;
    }
    md-filled-tonal-icon-button.large {
      --md-filled-tonal-icon-button-icon-size: 24px;
      --md-filled-tonal-icon-button-container-shape: 16px;
      --md-filled-tonal-icon-button-container-size: 80px;
      width: 80px;
      height: 64px;
      margin: 0;
    }
  `;

  @property({type: String})
  iconButtonStyle: 'filled'|'floating'|'onImage' = 'filled';
  @property({type: String})
  iconButtonSize: 'small'|'default'|'large' = 'default';

  override render() {
    if (this.iconButtonStyle === 'floating') {
      return html`<md-standard-icon-button class=${this.iconButtonSize}>
        <slot name="icon"></slot>
      </md-standard-icon-button>`;
    } else {
      // Both filled & onImage use the md-filled-tonal-icon-button.
      return html`<md-filled-tonal-icon-button class=${this.iconButtonSize}>
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
