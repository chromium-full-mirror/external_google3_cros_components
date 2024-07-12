/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '../icon_button/icon-button';
import '../placeholder_icon/placeholder-icon';
import '@material/web/focus/md-focus-ring.js';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A chromeOS compliant accordion-item for use in <cros-accordion>. */
export class AccordionItem extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    .accordion-row {
      align-items: center;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      height: 48px;
      justify-content: space-between;
      outline: none;
      padding: 16px;
      padding-inline-end: 12px;
      position: relative;
    }

    .leading {
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .title-and-subtitle {
      flex: 1;
      margin-inline: 16px;
    }

    .title {
      color: var(--cros-sys-on_surface);
      font: var(--cros-title-1-font);
    }

    .subtitle {
      color: var(--cros-sys-on_surface_variant);
      font: var(--cros-body-2-font);
    }

    md-focus-ring {
      --md-focus-ring-color: var(--cros-sys-focus_ring);
      --md-focus-ring-width: 2px;
      --md-focus-ring-active-width: 2px;
      --md-focus-ring-shape: 8px;
    }
  `;

  /** @nocollapse */
  static override properties = {
    expanded: {type: Boolean, reflect: true},
  };

  /**
   * Whether or not the accordion content is visible.
   * @export
   */
  expanded: boolean;

  constructor() {
    super();
    this.expanded = false;
  }

  override render() {
    return html`
      <div class="container">
        <div
            class="accordion-row"
            part="row"
            @click=${this.onRowClick}
            @keydown=${this.onRowKeyDown}
            tabindex="0">
          <div class="leading">
            <slot name="leading"></slot>
          </div>
          <section class="title-and-subtitle">
            <div class="title">
              <slot name="title"></slot>
            </div>
            <div class="subtitle">
              <slot name="subtitle"></slot>
            </div>
          </section>
          <cros-icon-button
            @keydown=${this.onButtonKeyDown}
            buttonStyle="floating"
            surface="base"
            shape="square">
            <!-- TODO(b/352115367): Replace placeholder icon with chevron. -->
            <cros-placeholder-icon slot="icon"></cros-placeholder-icon>
          </cros-icon-button>
          <md-focus-ring></md-focus-ring>
        </div>
        <section class="content" ?hidden=${!this.expanded}>
          <slot></slot>
        </section>
      </div>
    `;
  }

  private onRowClick() {
    this.toggleExpanded();
  }

  private onButtonKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Stop propagation so the row keydown handler doesn't also toggle the
      // accordion.
      e.stopPropagation();
      this.toggleExpanded();
    }
  }

  private onRowKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggleExpanded();
    }
  }

  private toggleExpanded() {
    this.expanded = !this.expanded;
  }
}

customElements.define('cros-accordion-item', AccordionItem);

declare global {
  interface HTMLElementTagNameMap {
    'cros-accordion-item': AccordionItem;
  }
}
