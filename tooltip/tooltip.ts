/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * Allow popover show and hide functions. See
 * https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
 * go/typescript-reopening
 */
declare interface HTMLElementWithPopoverAPI extends HTMLElement {
  showPopover: () => void;
  hidePopover: () => void;
}

// The name of the anchor to use for the CSS Anchor Positioning API.
const ANCHOR_NAME = css`--tooltip-anchor`;

/** A cros-compliant tooltip component. */
export class Tooltip extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    /* Remove default CSS Popover API styles. */
    :host {
      border: 0;
      margin: 0;
      padding: 0;
    }

    #tooltip-anchor-overlay {
      anchor-name: ${ANCHOR_NAME};
      opacity: 0;
      pointer-events: none;
      position: fixed;
    }

    #label {
      background-color: var(--cros-sys-inverse_surface);
      border-radius: 6px;
      color: var(--cros-sys-surface);
      font: var(--cros-annotation-1-font);
      inset-area: block-end;
      inset-block-start: 4px;
      padding: 5px 8px;
      position-anchor: ${ANCHOR_NAME};
      position: fixed;
      text-align: center;
    }
  `;
  /** @nocollapse */
  static override properties = {
    anchor: {type: String},
    label: {type: String},
  };

  /** @export */
  anchor: string;
  /** @export */
  label: string;

  constructor() {
    super();
    this.anchorElement = null;
    this.anchor = '';
    this.label = '';
  }

  /** @export */
  get anchorElement(): HTMLElement|null {
    if (this.anchor) {
      return (this.getRootNode() as Document | ShadowRoot)
          .querySelector(`#${this.anchor}`);
    }
    return this.currentAnchorElement;
  }

  /** @export */
  set anchorElement(element: HTMLElement|null) {
    this.currentAnchorElement = element;
    this.requestUpdate('anchorElement');
  }

  private currentAnchorElement: HTMLElement|null = null;

  override firstUpdated() {
    // Adds needed popover properties to cros-tooltip.
    this.setAttribute('popover', 'auto');
    this.setAttribute('id', 'tooltip');

    // Sets anchor to this element's ID & adds listeners on hover.
    if (this.anchorElement) {
      this.anchorElement.setAttribute('popovertarget', 'tooltip');
      this.anchorElement.addEventListener('mouseover', () => {
        this.openPopover();
      });
      this.anchorElement.addEventListener('mouseout', () => {
        this.closePopover();
      });
    }
  }

  override disconnectedCallback() {
    if (this.anchorElement) {
      this.anchorElement.removeEventListener('mouseover', this.openPopover);
      this.anchorElement.removeEventListener('mouseout', this.closePopover);
    }
    super.disconnectedCallback();
  }

  openPopover() {
    // When the popover opens, move the tooltip to the anchor.
    this.updateAnchorPosition();

    const tooltip = this as unknown as HTMLElementWithPopoverAPI;
    tooltip.showPopover();
  }

  closePopover() {
    const tooltip = this as unknown as HTMLElementWithPopoverAPI;
    tooltip.hidePopover();
  }

  // The CSS Anchor Positioning API does not yet allow elements in a shadow DOM
  // to see anchor names defined in the outer tree scope. To work around this,
  // there is an internal anchor point (#tooltip-anchor-overlay) that we
  // position to overlap exactly with the actual anchor element. From there, we
  // can use the CSS Anchor Positioning API to position the tooltip. See
  // https://github.com/w3c/csswg-drafts/issues/9408#issuecomment-2105453734 for
  // more context.
  private updateAnchorPosition() {
    if (!this.anchorElement) return;

    const anchorOverlay =
        this.shadowRoot!.getElementById('tooltip-anchor-overlay')!;
    const anchorRect = this.anchorElement.getBoundingClientRect();

    // Move the anchor overlay so that it overlaps the anchor element.
    anchorOverlay.style.top = `${anchorRect.top}px`;
    anchorOverlay.style.left = `${anchorRect.left}px`;
    anchorOverlay.style.width = `${anchorRect.width}px`;
    anchorOverlay.style.height = `${anchorRect.height}px`;
  }

  override render() {
    return html`
      <div id="tooltip-anchor-overlay"></div>
      <div id="label">${this.label}</div>
    `;
  }
}

customElements.define('cros-tooltip', Tooltip);

declare global {
  interface HTMLElementTagNameMap {
    'cros-tooltip': Tooltip;
  }
}
