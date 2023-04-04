/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The worker insantiation code used when lottie-renderer is
 * running in chromium. NOTE this is in a sub folder so automatic build tools
 * don't keep trying to add cr_worker into ts_library rules. This file must
 * never actually get compiled in google3 because it creates a worker in a
 * unsafe way. This is fine in chromium however.
 */

const WORKER_BINARY = './lottie_worker.js';

/** Construct a lottie web worker and return it. */
export function getWorker() {
  return new Worker(WORKER_BINARY);
}
