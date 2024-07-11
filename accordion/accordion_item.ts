/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '../icon_button/icon-button';
import '../placeholder_icon/placeholder-icon';

import {css, CSSResultGroup, html, LitElement} from 'lit';

/** A chromeOS compliant accordion-item for use in <cros-accordion>. */
export class AccordionItem extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    .accordion-row {
      align-items: center;
      display: flex;
      flex-direction: row;
      height: 48px;
      justify-content: space-between;
      padding: 16px;
      padding-inline-end: 12px;
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
        <div class="accordion-row">
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
            buttonStyle="floating"
            surface="base"
            shape="square">
            <!-- TODO(b/352115367): Replace placeholder icon with chevron. -->
            <cros-placeholder-icon slot="icon"></cros-placeholder-icon>
          </cros-icon-button>
        </div>
        <section class="content" ?hidden=${!this.expanded}>
          <slot></slot>
        </section>
      </div>
    `;
  }
}

customElements.define('cros-accordion-item', AccordionItem);

declare global {
  interface HTMLElementTagNameMap {
    'cros-accordion-item': AccordionItem;
  }
}
