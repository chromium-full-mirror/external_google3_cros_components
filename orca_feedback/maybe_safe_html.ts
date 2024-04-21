/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {safeHTML} from 'lit/directives/safe-html';
import {HtmlSanitizer, HtmlSanitizerBuilder} from 'safevalues';

// The santinizer below is being used to sanitize the markup from i18n strings.
const HTML_SANITIZER: HtmlSanitizer =
    new HtmlSanitizerBuilder()
        .onlyAllowElements(new Set<string>(['a']))
        .onlyAllowAttributes(new Set<string>(['role', 'aria-label', 'href']))
        .allowClassAttributes()
        .allowIdAttributes()
        .build();

/**
 * Util method to hide HTML sanitization logic so we can support both Open
 * Source Lit and Google3 Lit.
 */
export function maybeSafeHTML(html: string) {
  return safeHTML(HTML_SANITIZER.sanitize(html));
}
