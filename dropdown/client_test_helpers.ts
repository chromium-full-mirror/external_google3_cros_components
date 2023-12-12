/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A set of helpers clients can use to interact with a
 * cros-dropdown in tests.
 */

import {MdOutlinedSelect} from '@material/web/select/outlined-select.js';
import {cast} from 'google3/javascript/common/asserts/asserts';
import {isInstanceOf} from 'google3/javascript/common/asserts/guards';
import {SelectHarness as MdSelectHarness} from 'google3/third_party/javascript/material/web/select/harness';

import {Dropdown} from './dropdown';

/** Get the internal `md-outlined-select` element. */
export function getMdSelect(dropdown: Dropdown): MdOutlinedSelect {
  return cast(
      dropdown.renderRoot.querySelector('md-outlined-select'),
      isInstanceOf(MdOutlinedSelect));
}

/**
 * The harness for CrOS dropdown. It delegates to the harness of the underlying
 * MD select.
 */
export class SelectHarness extends MdSelectHarness {
  constructor(dropdown: Dropdown) {
    super(getMdSelect(dropdown));
  }
}

/** Helper to open the dropdown and wait for any animations. */
export async function openDropdown(dropdown: Dropdown) {
  const selectHarness = new SelectHarness(dropdown);
  await selectHarness.click();
}
