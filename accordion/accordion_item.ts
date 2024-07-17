/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '../icon_button/icon-button';
import '@material/web/focus/md-focus-ring.js';

import {css, CSSResultGroup, html, LitElement} from 'lit';
import {ClassInfo, classMap} from 'lit/directives/class-map';

/**
 * The SVG to use in the accordion item's icon button when the accordion row is
 * collapsed.
 */
const CHEVRON_DOWN_ICON = html`
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        slot="icon"
        class="chevron-icon">
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.41 6L10 10.9447L14.59 6L16 7.52227L10 14L4 7.52227L5.41 6Z" />
    </svg>`;

/**
 * The SVG to use in the accordion item's icon button when the accordion row is
 * expanded.
 */
const CHEVRON_UP_ICON = html`
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        slot="icon"
        class="chevron-icon">
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.41 14L10 9.05533L14.59 14L16 12.4777L10 6L4 12.4777L5.41 14Z" />
    </svg>`;


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
      padding-inline-end: 16px;
    }

    .has-leading .title-and-subtitle {
      padding-inline-start: 16px;
    }

    .title {
      color: var(--cros-sys-on_surface);
      font: var(--cros-title-1-font);
    }

    .subtitle {
      color: var(--cros-sys-on_surface_variant);
      font: var(--cros-body-2-font);
    }

    .content {
      padding: 16px;
      padding-block-start: 0;
    }

    .container::after {
      background: var(--cros-sys-separator);
      content: '';
      display: var(--cros-accordion-item-separator-display, block);
      height: 1px;
      width: 100%;
    }

    .chevron-icon {
      fill: var(--cros-sys-on_surface);
    }

    md-focus-ring {
      --md-focus-ring-color: var(--cros-sys-focus_ring);
      --md-focus-ring-width: 2px;
      --md-focus-ring-active-width: 2px;
      --md-focus-ring-shape: 8px;
      --md-focus-ring-outward-offset: 1px;
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
    const containerClasses: ClassInfo = {
      'has-leading': this.hasLeading(),
    };

    return html`
      <div class="container ${classMap(containerClasses)}">
        <div
            class="accordion-row"
            part="row"
            @click=${this.onRowClick}
            @keydown=${this.onRowKeyDown}
            tabindex="0">
          <div class="leading">
            <slot name="leading" @slotchange=${this.onLeadingSlotChange}></slot>
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
            ${this.expanded ? CHEVRON_UP_ICON : CHEVRON_DOWN_ICON}
          </cros-icon-button>
          <md-focus-ring></md-focus-ring>
        </div>
        <section class="content" ?hidden=${!this.expanded}>
          <slot></slot>
        </section>
      </div>
    `;
  }

  /**
   * Returns true if the accordion item has content in its leading slot.
   */
  private hasLeading(): boolean {
    return (this.shadowRoot
                ?.querySelector<HTMLSlotElement>('slot[name="leading"]')
                ?.assignedElements()
                .length ??
            0) > 0;
  }

  // The padding before the title/subtitle changes based on whether there is
  // content in the `leading` slot. It's currently not possible to detect slot
  // content via CSS. When the `leading` slot changes, we request an update to
  // force the element to re-render and thus apply the `has-leading` class.
  private onLeadingSlotChange() {
    this.requestUpdate();
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
