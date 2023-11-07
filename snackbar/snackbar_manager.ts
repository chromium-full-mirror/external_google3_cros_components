/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Defines the SnackbarManager class, which manages the operation
 * of the snackbar apps.
 *
 */

import {Button} from '../button/button';
import {Snackbar} from '../snackbar/snackbar';

import {ShowSnackbarEventDetail, SnackbarOptions} from './show_snackbar';

/**
 * Allow popover show and hide functions. See
 * https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
 * go/typescript-reopening
 */
declare interface HTMLElementWithPopoverAPI extends Snackbar {
  showPopover: () => void;
  hidePopover: () => void;
}

/**
 * SnackbarManager is responsible for handling requests to show the snackbar
 * across the entire app.
 */
export class SnackbarManager {
  /** Function to run when the snackbar button is clicked. */
  private buttonFunction?: () => void;
  /** Function to run when the snackbar is closed. */
  private onCloseFunction?: () => void;

  /**
   * @param snackbar The snackbar element at the root for showing snackbar
   *     messages.
   * @param button The button element within the snackbar element.
   */
  constructor(
      private readonly snackbar: Snackbar, private readonly button: Button) {
    this.button.addEventListener('click', () => {
      this.snackbar.hidePopover();
      if (this.buttonFunction) this.buttonFunction();
    });
    this.snackbar.addEventListener(
        'cros-snackbar-closed', this.onCloseHandler.bind(this));
  }

  /**
   * Shows a snackbar with a given message and optional button. Snackbars will
   * not stack, and this function will force close and override any previous
   * snackbar regardless of whether it is currently opened or closed.
   * @param options The configuration options for the snackbar.
   */
  showSnackbar(options: SnackbarOptions) {
    if (this.snackbar.open) {
      this.onCloseHandler();
      // Close the snackbar to restart the snackbar timer.
      this.snackbar.hidePopover();
    }
    this.button.toggleAttribute('hidden', !options.buttonText);
    this.button.label = options.buttonText || '';
    this.snackbar.message = options.messageText;
    this.snackbar.timeoutMs =
        (options.durationMs !== undefined) ? options.durationMs : 10000;
    this.buttonFunction = options.buttonFunction;
    this.onCloseFunction = options.onCloseFunction;
    this.snackbar.closeOnEscape = true;
    this.snackbar.showPopover();
  }

  /** Close the snackbar if it is open. */
  closeSnackbar() {
    this.snackbar.hidePopover();
  }

  /**
   * Calls the onCloseFunction if it is defined. Should run this when the
   * snackbar closes.
   */
  private onCloseHandler() {
    if (this.onCloseFunction) this.onCloseFunction();
  }
}

/**
 * Creates a new SnackbarManager and adds the event listener for it.
 *
 * After installation, the snackbar can be triggered by dispatching events. For
 * example:
 *
 * ```
 * showSnackbar({
 *   messageText: 'Dismissed item',
 *   buttonText: 'Undo',
 *   buttonFunction: () => {
 *     console.info('Undo dismiss');
 *   },
 * });
 * ```
 *
 * @return The event handlers. Can use these to remove the event listeners.
 */
export function installSnackbarEventHandler(
    snackbar: Snackbar, button: Button) {
  const snackbarManager = new SnackbarManager(snackbar, button);
  const showEventHandler = (event: CustomEvent<ShowSnackbarEventDetail>) => {
    snackbarManager.showSnackbar(event.detail.options);
  };
  const closeEventHandler = () => {
    snackbarManager.closeSnackbar();
  };
  document.body.addEventListener('show-snackbar', showEventHandler);
  document.body.addEventListener('close-snackbar', closeEventHandler);
  return {showEventHandler, closeEventHandler};
}
