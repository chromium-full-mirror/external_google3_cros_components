/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import './toast-item';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * Event interface for toast toggle events. Closure fires off the wrong event
 * type that is missing these fields.
 * TODO: 307830635 - Remove once ToggleEvents are supported.
 */
declare interface ToggleEvent extends Event {
  newState: 'open'|'close';
  oldState: 'open'|'close';
}

/** A chromeOS compliant toast. */
export class Toast extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`

    :host(:popover-open) {
      border: none;
      padding: 0px;
    }
  `;

  /**
   * The visible message on the toast surface.
   * @export
   */
  message: string;

  /** @export */
  override role = 'alert';

  /**
   * Timeout between the toast showing and hiding, in milliseconds.
   */
  timeout = -1;

  /** @export */
  override popover = 'manual';

  /** @nocollapse */
  static override properties = {
    message: {type: String, reflect: true},
    timeout: {type: Number, reflect: true},
  };

  /** @nocollapse */
  static events = {
    /** The toast popup timed out and closed itself. */
    TIMEOUT: 'cros-toast-timeout',
  } as const;

  private pendingTimeout: number|null = null;

  constructor() {
    super();
    this.message = '';
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('toggle', (e) => this.onToggle(e as ToggleEvent));
  }

  override render() {
    return html`
        <cros-toast-item message=${this.message}></cros-toast-item>
    `;
  }

  private onToggle(e: ToggleEvent) {
    if (e.newState === 'open') {
      this.startTimeout();
    }
  }

  private startTimeout() {
    if (this.timeout < 1 || this.pendingTimeout) return;
    this.pendingTimeout = setTimeout(() => {
      this.hidePopover();
      this.dispatchEvent(new CustomEvent('cros-toast-timeout'));
      clearTimeout(this.pendingTimeout!);
      this.pendingTimeout = null;
    }, this.timeout);
  }
}

customElements.define('cros-toast', Toast);

declare global {
  interface HTMLElementTagNameMap {
    'cros-toast': Toast;
  }
  interface HTMLElementEventMap {
    [Toast.events.TIMEOUT]: Event;
  }
}
