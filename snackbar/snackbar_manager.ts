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

/**
 * Allow popover show and hide functions. See
 * https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
 * go/typescript-reopening
 */
declare interface HTMLElementWithPopoverAPI extends Snackbar {
  showPopover: () => void;
  hidePopover: () => void;
}

/** Snackbar configuration options. */
export declare interface SnackbarOptions {
  /** The text to display in the snackbar message. */
  messageText: string;
  /**
   * Automatic dismiss timeout in milliseconds. Value must be between 4000 and
   * 10000, or it can be -1 to disable the timeout completely. Default 10000ms.
   */
  durationMs?: number;
  /** The text to display in the snackbar button. */
  buttonText?: string;
  /** The function to run when the snackbar button is clicked. */
  buttonFunction?: () => void;
  /** The function to run when the snackbar button is closed. */
  onCloseFunction?: () => void;
}

/** Typed wrapper for the details of an snackbar event. */
export declare interface ShowSnackbarEventDetail {
  /** Options for showSnackbar. */
  options: SnackbarOptions;
}

/** Dispatches a new show snackbar event with the options. */
export function showSnackbar(options: SnackbarOptions) {
  document.body.dispatchEvent(new CustomEvent(
      'show-snackbar', {detail: {options}, bubbles: true, composed: true}));
}

/** Dispatches a new close snackbar event. */
export function closeSnackbar() {
  document.body.dispatchEvent(
      new CustomEvent('close-snackbar', {bubbles: true, composed: true}));
}

declare global {
  interface HTMLElementEventMap {
    'show-snackbar': CustomEvent<ShowSnackbarEventDetail>;
    'close-snackbar': CustomEvent;
  }
}

/**
 * SnackbarManager is responsible for handling requests to show the snackbar
 * across the entire app.
 */
export class SnackbarManager {
  private readonly snackbar = new Snackbar();
  private readonly button = new Button();
  private readonly showEventHandler =
      (event: CustomEvent<ShowSnackbarEventDetail>) => {
        this.showSnackbar(event.detail.options);
      };
  private readonly closeEventHandler = () => {
    this.closeSnackbar();
  };

  /** Function to run when the snackbar button is clicked. */
  private buttonFunction?: () => void;
  /** Function to run when the snackbar is closed. */
  private onCloseFunction?: () => void;

  constructor(installHandlers = false) {
    this.button.slot = 'action';
    this.button.buttonStyle = 'floating';
    this.button.inverted = true;
    this.button.addEventListener('click', () => {
      this.snackbar.hidePopover();
      if (this.buttonFunction) this.buttonFunction();
    });
    this.snackbar.addEventListener(
        'cros-snackbar-closed', this.onCloseHandler.bind(this));
    if (installHandlers) {
      this.installHandlers();
    }

    this.snackbar.appendChild(this.button);
    document.body.appendChild(this.snackbar);
  }

  /**
   * Shows a snackbar with a given message and optional button. Snackbars will
   * not stack, and this function will force close and override any previous
   * snackbar regardless of whether it is currently opened or closed.
   * @param options The configuration options for the snackbar.
   */
  showSnackbar(options: SnackbarOptions) {
    if (this.snackbar.open) {
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
    this.onCloseFunction?.();
  }

  installHandlers() {
    document.body.addEventListener('show-snackbar', this.showEventHandler);
    document.body.addEventListener('close-snackbar', this.closeEventHandler);
  }

  cleanup() {
    document.body.removeChild(this.snackbar);
    document.body.removeEventListener('show-snackbar', this.showEventHandler);
    document.body.removeEventListener('close-snackbar', this.closeEventHandler);
  }
}
