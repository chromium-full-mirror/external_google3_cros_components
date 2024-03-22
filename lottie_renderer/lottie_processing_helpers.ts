/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {hexToRgb} from '../helpers/helpers';

/**
 * The list of tokens that are used to identify shapes and colors in Lottie
 * animation data. If token names change, we will need to update this set.
 * Existing token names are very unlikely to change, it's more likely that new
 * tokens may be added if illustration palettes become more complex. There
 * is currently no easy way to generate this list in Google3, and as a small
 * set it can be manually maintained, but in future a more robust solution may
 * be needed. See go/cros-tokens (internal).
 */
export const CROS_TOKENS = [
  'cros.sys.illo.color1',
  'cros.sys.illo.color1.1',
  'cros.sys.illo.color1.2',
  'cros.sys.illo.color2',
  'cros.sys.illo.color3',
  'cros.sys.illo.color4',
  'cros.sys.illo.color5',
  'cros.sys.illo.color6',
  'cros.sys.illo.base',
  'cros.sys.illo.secondary',

  /**
   * These are colors outside of the standard illo palette. Some animations
   * need to modify the base background color depending on the surface so
   * contain tokens for app base, card color etc,
   */
  'cros.sys.app_base',
  'cros.sys.app_base_shaded',
  'cros.sys.app_base_elevated',
  'cros.sys.illo.card.color4',
  'cros.sys.illo.card.on_color4',
  'cros.sys.illo.card.color3',
  'cros.sys.illo.card.on_color3',
  'cros.sys.illo.card.color2',
  'cros.sys.illo.card.on_color2',
  'cros.sys.illo.card.color1',
  'cros.sys.illo.card.on_color1',
] as const;

type CrosToken = typeof CROS_TOKENS[number];


/** String variant of the name field used for comparison during parsing. */
const LOTTIE_GRADIENT_FILL_TYPE = 'gf';

/**
 * A structure in the JSON data that should correspond to something that needs
 * to be dynamically colored.
 */
declare interface DynamicallyColoredObject {
  /**
   * The name of a shape. For Material3 compliant animations, this will be the
   * token name of the color to apply, and we use this field to detect which
   * parts of the JSON data correspond to colored structures.
   */
  nm: string;
  /**
   * Optional type of the structure. This field will be set to the value of
   * `LOTTIE_GRADIENT_FILL_TYPE` if it is a gradient fill structure. If not, we
   * assume that it is a regular shape (like a stroke or fill).
   */
  ty?: string;
}

/**
 * This definition of this type is taken from
 * https://lottiefiles.github.io/lottie-docs/concepts/#colors
 */
declare interface LottieShape extends DynamicallyColoredObject {
  /** If the color is represented as an array of four floats: [r, g, b, a]. */
  c?: {k: number[]};
  /** If the color is represented as a hex string (less common than `c`). */
  sc?: string;
}


/**
 * This definition of this type is taken from
 * https://lottiefiles.github.io/lottie-docs/shapes/#gradients
 */
declare interface LottieGradientFill extends DynamicallyColoredObject {
  /** Gradient color type. */
  g: {
    /** The number of colors in this gradient. */
    p: number,
    /** Animated Gradient Colors. */
    k: {
      /**
       * Whether the property is animated, should be 0 for this fill type which
       * means the following `k` type is an array of values rather than
       * keyframes.
       */
      a: 0,
      /**
       * Gradient values over time.
       * Values are grouped in contiguous sub-arrays like [t, r, g, b], where
       * [r,g,b] is a decimal representation of color channel values at time
       * `t`. There should be `p` number of sub arrays. If alpha values are
       * included, they are at the end of the array, grouped as [t, a], where a
       * is the alpha value to apply at time `t`. If alpha values are not
       * included, the k.length will be p*4, with alpha values it is p*6. The
       * relationship between the location of a set of [t, r, g, b] values and
       * an alpha value, is described by a_n = 4p + 2i + 1.
       */
      k: number[]
    }
  };
}

/**
 * A type for storing a css variable and a list of known shapes within the
 * currently loaded animation that have the css variable color applied. There
 * will be one of these structures per token in CROS_TOKENS that appears in the
 * animation data.
 */
declare interface TokenColor {
  cssVar: string;
  shapes: LottieShape[];
  gradients: LottieGradientFill[];
}

/**
 * A fixed length array type for encoding Lottie colors. The format is [r, g, b,
 * alpha], where each entry is a value between [0-1].
 */
declare type LottieRGBAArray = [number, number, number, number];

/**
 * Helper function for converting between the hexadecimal string we get from the
 * computed style to LottieRGBAArray type. Since these come directly
 * from the computed style and color pipeline, we can be confident that we are
 * only going to be parsing 8 digit hexadecimal strings.
 */
function convertHexToLottieRGBA(hexString: string): LottieRGBAArray {
  let r;
  let g;
  let b;
  let alpha;
  if (hexString.length === 9) {
    // Assume #rrggbbaa format.
    const hexRgb = hexString.slice(0, -2);
    const alphaString = hexString.slice(-2);
    [r, g, b] = hexToRgb(hexRgb);
    alpha = Number(`0x${alphaString}`);
  } else {
    // Assume #rrggbb format.
    [r, g, b] = hexToRgb(hexString);
    alpha = 255;
  }

  return [r / 255, g / 255, b / 255, alpha / 255];
}

/**
 * Takes in a cros token and returns the corresponding css variable.
 * Eg: cros.sys.illo.base -> --cros-sys-illo-base.
 */
function convertTokenToCssVariable(token: string) {
  return `--${(token).replaceAll('.', '-')}`;
}

function getOrCreateTokenColor(
    colors: Map<string, TokenColor>, tokenName: CrosToken) {
  if (!colors.has(tokenName)) {
    colors.set(tokenName, {
      cssVar: convertTokenToCssVariable(tokenName),
      shapes: [],
      gradients: []
    });
  }
  return (colors.get(tokenName) as TokenColor);
}

function isValidTokenName(tokenName: string|null): tokenName is CrosToken {
  if (tokenName === null) {
    return false;
  }
  if ((CROS_TOKENS as readonly string[]).includes(tokenName)) {
    return true;
  }
  return false;
}

/**
 * A class wrapping a lottie JSON file that has been injected with dynamic
 * variables that can be hot swapped with new values at runtime.
 */
export class ProcessedLottieJSON {
  private colorReferences = new Map<CrosToken, TokenColor>();
  numMappedColors = 0;

  constructor(private readonly animationData: object) {
    this.traverse(this.animationData);
  }

  /**
   * Traverses through a jsonObject, looking for known keys and tokens, and
   * saving them in the `shapes` and `gradients` map.
   */
  private traverse(jsonObj: object) {
    if (jsonObj === null || typeof jsonObj !== 'object') return;

    for (const value of Object.values(jsonObj)) {
      const tokenName = (jsonObj as DynamicallyColoredObject).nm || null;
      let tokenColor = null;
      let gradient = null;
      let shape = null;
      if (isValidTokenName(tokenName)) {
        tokenColor = getOrCreateTokenColor(this.colorReferences, tokenName);
        const gradientObj = jsonObj as LottieGradientFill;

        // Attempt to parse the object as a gradient, otherwise we assume it is
        // a regular shape. If more complex animation types get added, this
        // logic will need to be updated along with the types.
        if (gradientObj.ty === LOTTIE_GRADIENT_FILL_TYPE) {
          gradient = gradientObj;
          this.numMappedColors++;
        } else {
          shape = jsonObj as LottieShape;
          this.numMappedColors++;
        }
      }

      this.traverse(value);

      if (tokenColor) {
        if (gradient) tokenColor.gradients.push(gradient);
        if (shape) tokenColor.shapes.push(shape);
      }
    }
  }

  /**
   * Finds all dynamic colors in the underlying json file and updates their
   * values to match the current color palette in the document.
   *
   * @param styles A CSSStyleDecleration from getComputedStyles() on the element
   * to pull css variable values from.
   * @returns A list of warnings in attempting to update the color on the json
   * file.
   */
  updateColors(styles: CSSStyleDeclaration): string[] {
    const warnings = [];
    for (const color of this.colorReferences.values()) {
      const computedColor = styles.getPropertyValue(color.cssVar).trim();
      const colorArray = convertHexToLottieRGBA(computedColor);
      for (const location of color.shapes) {
        if (location.c) {
          location.c.k = colorArray;
        } else if (location.sc) {
          location.sc = computedColor;
        } else {
          warnings.push(
              `Unable to assign color to shape: ${JSON.stringify(location)}`);
        }
      }

      for (const location of color.gradients) {
        const numOfPoints = location.g.p;
        for (let i = 0; i < numOfPoints; i++) {
          const gradientFillPoints = location.g.k.k;
          gradientFillPoints[(4 * i) + 1] = colorArray[0];
          gradientFillPoints[(4 * i) + 2] = colorArray[1];
          gradientFillPoints[(4 * i) + 3] = colorArray[2];
        }
      }
    }

    return warnings;
  }

  getAnimationData() {
    return this.animationData;
  }
}
