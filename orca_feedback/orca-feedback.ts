/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '../button/button';
import '../chip/chip';

import {Task} from '@lit/task';
import {css, CSSResultGroup, html, LitElement} from 'lit';

/**
 * Component so that users can send feedback about a particular suggestion that
 * we make.
 */
export class OrcaFeedback extends LitElement {
  /** @nocollapse */
  static override styles: CSSResultGroup = css`
    :host {
      --footer-height: 61px;
      --top-padding: 32px;
      background-color: var(--cros-sys-base_elevated);
      display: block;
      padding-top: var(--top-padding);
      width: 512px;
    }

    div.link {
      cursor: pointer;
      color: var(--cros-sys-primary);
      text-decoration: underline;
      font: inherit;
      display: inline;
    }

    textarea {
      background-color: var(--cros-sys-input_field_on_base);
      border-radius: 8px;
      color: var(--cros-sys-secondary);
      margin-block: -16px; /* only 8px gap around textbox */
      flex-shrink: 0;
      font: var(--cros-body-2-font);
      height: 104px;
      padding-inline: 16px;
      padding-block: 8px;
    }

    textarea::placeholder {
      font: var(--cros-body-2-font);
      color: var(--cros-sys-secondary);
    }

    .scrollable {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      gap: 24px;
      max-height: calc(600px - var(--footer-height) - var(--top-padding));
      overflow-y: scroll;
      padding-bottom: 24px;
      padding-inline: 32px;

      .heading {
        font: var(--cros-display-6-font);
        color: var(--cros-sys-on_surface);
      }

      .body {
        font: var(--cros-body-2-font);
        color: var(--cros-sys-on_surface_variant);
      }

      .legal-footer-text {
        font: var(--cros-annotation-1-font);
        color: var(--cros-sys-on_surface_variant);
      }

      .question {
        font: var(--cros-headline-1-font);
        color: var(--cros-sys-on_surface);
      }

      .buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .extra-info {
        font: var(--cros-annotation-2-font);
        color: var(--cros-sys-on_surface_variant);
        border: 1px solid var(--cros-sys-separator);
        border-radius: 8px;
        padding: 12px;
        white-space: pre-line;

        .key {
          font-weight: 700;
        }

        .value {
        }
      }
    }

    .scrollable[disablescrollingfortesting] {
      max-height: none;
    }

    .footer {
      position: sticky;
      bottom: 0;
      .footer-buttons {
        align-items: center;
        background-color: var(--cros-sys-base_elevated);
        box-sizing: border-box;
        display: flex;
        flex-shrink: 0;
        gap: 8px;
        padding-inline-end: 16px;
        height: var(--footer-height);
        justify-content: flex-end;
        position: sticky;
        right: 0;
        width: 100%;
      }
    }
    .footer::before {
      content: ' ';
      width: 100%;
      height: 1px;
      flex-shrink: 0;
      background-color: var(--cros-sys-separator);
      display: block;
    }
  `;

  /** @nocollapse */
  static override properties = {
    extraInfoCallback: {
      attribute: false,
    },
    revertToPreviousScreen: {},
    disableScrollingForTesting: {},
    submitFeedback: {
      attribute: false,
    },
    openUrl: {
      attribute: false,
    },
    stringSource: {
      attribute: false,
    },
  };
  /** @export */
  extraInfoCallback = async () => '';
  /** @export */
  revertToPreviousScreen = () => {};
  /** @export */
  disableScrollingForTesting = false;
  private readonly extraInfoTask = new Task(this, {
    task: async ([callback]: [() => Promise<string>]) => await callback(),
    args: () => [this.extraInfoCallback] as const as [() => Promise<string>],
  });
  /** @export */
  submitFeedback: (userDescription: string) => void = () => {};
  /** @export */
  openUrl: (url: string) => void = () => {};
  /**
   * Must be set, to ensure nice user facing strings
   * @export
   **/
  stringSource: {
    getAriaLabelForLink: (arg: string) => string;
    MSG_PRIVACY_POLICY: string;
    MSG_GEN_AI: string;
    MSG_TERMS_OF_SERVICE: string;
  } | null = null;
  get userDescription(): HTMLTextAreaElement | undefined {
    return this.shadowRoot!.querySelector('#userDescription') as
      | HTMLTextAreaElement
      | undefined;
  }

  getSelectedChips() {
    const chips = this.shadowRoot!.querySelectorAll('cros-chip');
    return Array.from(chips).filter((chip) => chip.selected);
  }

  isFeedbackEnabled() {
    if (this.userDescription?.value !== '') {
      return true;
    }
    return this.getSelectedChips().length > 0;
  }

  // Feedback user description includes both the freeform textarea and the selected chips.
  getFeedbackUserDescription() {
    const chipsDescription = this.getSelectedChips()
      .map((chip) => `#${chip.label}`)
      .join(' ');
    return `${this.userDescription?.value ?? ''}\n${chipsDescription}`;
  }

  constructor() {
    super();
    document.title = 'Feedback';
  }

  override render() {
    return html`
      <div class="scrollable" ?disablescrollingfortesting="${
        this.disableScrollingForTesting
      }">
      <div class="heading">Send feedback</div>
      <div class="body">
      Thanks for sharing your experience. Your feedback helps us create more accurate and beneficial content.
      </div>
      <div class="question">What didn't work well?</div>
      <textarea
        id="userDescription"
        placeholder="Share your feedback or describe your issue. Make sure to not include anything that is personal, sensitive, or confidential."
        @input=${() => void this.requestUpdate()}
        ></textarea>
      <div class="buttons">
        <cros-chip label="Offensive/Unsafe" @click=${() =>
          void this.requestUpdate()}></cros-chip>
        <cros-chip label="Factually incorrect" @click=${() =>
          void this.requestUpdate()}></cros-chip>
        <cros-chip label="Legal issue" @click=${() =>
          void this.requestUpdate()}></cros-chip>
      </div>
      <div class="legal-footer-text">When you click send, <strong>your country, Chrome version, feedback, and content (shown below)</strong> may be used to train or improve our products and services subject to the <div
        class="link"
        role="link"
        aria-label=${
          this.stringSource?.getAriaLabelForLink(
            this.stringSource.MSG_PRIVACY_POLICY,
          ) ?? ''
        }
        tabindex="0"
        @click=${() =>
          void this.openUrl('https://policies.google.com/privacy')}>
          ${this.stringSource?.MSG_PRIVACY_POLICY}</div
        >, <div
          class="link"
          role="link"
          aria-label=${
            this.stringSource?.getAriaLabelForLink(
              this.stringSource.MSG_GEN_AI,
            ) ?? ''
          }
          tabindex="0"
          @click=${() =>
            void this.openUrl(
              'https://policies.google.com/terms/generative-ai',
            )}>
          ${this.stringSource?.MSG_GEN_AI}</div
        >, and <!-- TODO(b/328311147): Convert this to use slots. --> <div
          class="link"
          role="link"
          aria-label=${
            this.stringSource?.getAriaLabelForLink(
              this.stringSource.MSG_TERMS_OF_SERVICE,
            ) ?? ''
          }
          tabindex="0"
          @click=${() =>
            void this.openUrl('https://policies.google.com/terms')}>
          ${this.stringSource?.MSG_TERMS_OF_SERVICE}</div
        >. </div>
      <div class="extra-info">${this.extraInfoTask.render({
        complete: (extraInfo: string) => extraInfo,
      })}</div>
  </div>
      <div class="footer">
        <div class="footer-buttons">
        <cros-button label="Cancel" button-style="secondary" @click=${() =>
          void this.revertToPreviousScreen()}></cros-button>
        <cros-button
          label="Submit"
          button-style="primary"
          ?disabled=${!this.isFeedbackEnabled()}
          @click=${() => {
            this.submitFeedback(this.getFeedbackUserDescription());
            this.revertToPreviousScreen();
          }}
        ></cros-button>
        </div class="footer-buttons">
      </div>
    `;
  }
}

customElements.define('mako-orca-feedback', OrcaFeedback);

declare global {
  interface HTMLElementTagNameMap {
    'mako-orca-feedback': OrcaFeedback;
  }
}
