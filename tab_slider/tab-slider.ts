/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

import {isTabSliderItem, TabSliderItem, TabSliderItemSelectedChangedEvent, TabSliderItemTriggeredEvent} from './tab-slider-item';

/**
 * A chromeOS compliant tab-slider.
 *
 * https://www.figma.com/file/1XsFoZH868xLcLPfPZRxLh/CrOS-Next---Component-Library-%26-Spec?type=design&node-id=2852-19308&mode=design&t=uXwuM7QRyBvvkmwP-0
 */
export class TabSlider extends LitElement {
  private get itemSlot(): HTMLSlotElement {
    return this.shadowRoot!.querySelector('#items') as HTMLSlotElement;
  }

  get items(): TabSliderItem[] {
    return this.itemSlot.assignedElements().filter(isTabSliderItem);
  }

  get selectedItem(): TabSliderItem|null {
    return this.itemSlot.assignedElements()
               .filter(isTabSliderItem)
               .find(item => item.selected && !item.disabled) ||
        null;
  }

  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      background: rgba(var(--cros-sys-surface_variant-rgb), 0.8);
      border-radius: 100vh;
      display: inline-block;
      font: var(--cros-body-0-font);
      padding: 2px;
    }

    #items {
      display: flex;
    }

    /** TODO(b/296808808) - Replace with animation. */
    #items::slotted(cros-tab-slider-item[selected]) {
      background: var(--cros-sys-primary);
    }

    #items::slotted(cros-tab-slider-item[disabled]) {
      display: none;
    }
  `;

  /** @nocollapse */
  static override properties = {};

  override render() {
    return html`
      <div>
        <slot
            id="items"
            @cros-tab-slider-item-triggered=${this.onItemTriggered}
            @cros-tab-slider-item-selected-changed=${
        this.onItemSelectedChanged}>
        </slot>
      </div>
    `;
  }

  private onItemTriggered(event: TabSliderItemTriggeredEvent) {
    this.setSelected(event.detail.item);
  }

  private onItemSelectedChanged(event: TabSliderItemSelectedChangedEvent) {
    if (event.detail.item.selected) {
      this.setSelected(event.detail.item);
    }
  }

  /**
   * Sets `item` to be the selected item, unselected other items and plays the
   * transition animation.
   */
  setSelected(itemToSelect: TabSliderItem) {
    if (itemToSelect.disabled) {
      itemToSelect.selected = false;
      return;
    }

    // Unselect old items.
    for (const item of this.items) {
      if (item.selected && item !== itemToSelect) {
        item.selected = false;
      }
    }

    // TODO: b/296808808 - Play animation.
    itemToSelect.selected = true;
  }
}

customElements.define('cros-tab-slider', TabSlider);

declare global {
  interface HTMLElementTagNameMap {
    'cros-tab-slider': TabSlider;
  }
}
