/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Icon} from 'google3/third_party/javascript/cros_components/icon/icon';

import {Sidenav} from './sidenav';
import {SidenavItem} from './sidenav_item';

/** Check if an `Element` is a sidenav or not. */
export function isSidenav(element: unknown): element is Sidenav {
  return element instanceof Element && element.tagName === 'CROS-SIDENAV';
}

/** Check if an `Element` is a sidenav item or not. */
export function isSidenavItem(element: unknown): element is SidenavItem {
  return element instanceof Element && element.tagName === 'CROS-SIDENAV-ITEM';
}

/** Check if an `Element` is an icon or not. */
export function isIcon(element: unknown): element is Icon {
  return element instanceof Element && element.tagName === 'CROS-ICON';
}

/** True if the page is read right-to-left. */
export function isRTL() {
  return document.documentElement.dir === 'rtl';
}

/** Returns the active element, if it's a SidenavItem, or null. */
export function shadowPiercingActiveItem(): Element|null {
  let activeElement = document.activeElement;
  while (activeElement && !isSidenavItem(activeElement)) {
    activeElement = activeElement.shadowRoot ?
        activeElement.shadowRoot.activeElement :
        null;
  }
  return activeElement;
}
