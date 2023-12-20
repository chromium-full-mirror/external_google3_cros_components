/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A set of helpers clients can use to interact with a
 * cros-dropdown in tests.
 */

import './dropdown_option'; // So querySelector picks up the correct type.

import {SelectHarness as MdSelectHarness} from '@material/web/select/harness.js';
import {MdOutlinedSelect} from '@material/web/select/outlined-select.js';
import {cast} from 'google3/javascript/common/asserts/asserts';
import {isInstanceOf} from 'google3/javascript/common/asserts/guards';

import {waitForComponentReady} from '../client_test_helpers';
import {castExists} from '../helpers/helpers';
import {clickMenuItem} from '../menu/client_test_helpers';

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
  dropdown: Dropdown;

  constructor(dropdown: Dropdown) {
    super(getMdSelect(dropdown));
    this.dropdown = dropdown;
  }

  /** Helper to add focus to the cros-dropdown. */
  override async focusWithKeyboard() {
    this.addPseudoClass(this.dropdown, ':focus-within');
    await super.focusWithKeyboard();
  }
}

/** Get a harness for the `cros-dropdown` element. */
export function getHarnessFor(dropdown: Dropdown) {
  return new MdSelectHarness(getMdSelect(dropdown));
}

/** Helper to open the dropdown and wait for any animations. */
export async function openDropdown(dropdown: Dropdown) {
  const selectHarness = getHarnessFor(dropdown);
  await selectHarness.click();
}

/**
 * Click on a dropdown option triggering it to be the selection for a wrapping
 * cros-dropdown component. Assumes the dropdown is already open.
 */
export async function clickDropdownOption(
    dropdown: Dropdown, dropdownOptionIndex: number) {
  const dropdownOption = castExists(
      dropdown.querySelectorAll('cros-dropdown-option')[dropdownOptionIndex],
      `no such option at index ${dropdownOptionIndex}`);

  await clickMenuItem(dropdownOption);

  await waitForComponentReady(dropdown);
}
