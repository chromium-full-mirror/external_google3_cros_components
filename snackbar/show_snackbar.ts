/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Defines events for showing and hiding snackbars.
 */

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
