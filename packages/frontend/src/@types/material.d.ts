import React from 'react';
import { Palette, PaletteColor, PaletteColorOptions } from '@mui/material';
import { Typography } from '@mui/material/styles/createTypography';
import '@mui/material/styles';
import '@mui/material/styles/createTheme';
import '@mui/material/Typography';

interface CustomPaletteColors extends PaletteColor {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  A100?: string;
  A200?: string;
  A400?: string;
  A700?: string;
  '4p'?: string;
  '12p'?: string;
  '30p'?: string;
  '50p'?: string;
  '160p'?: string;
  '190p'?: string;
}

interface CustomPaletteColorOptions extends PaletteColorOptions {
  '4p'?: string;
  '12p'?: string;
  '30p'?: string;
  '50p'?: string;
  '160p'?: string;
  '190p'?: string;
}

interface CustomPalette extends Palette {
  primary: CustomPaletteColors;
  secondary: CustomPaletteColors;
  error: CustomPaletteColors;
  warning: CustomPaletteColors;
  info: CustomPaletteColors;
  success: CustomPaletteColors;
}

interface CustomTypography extends Typography {
  avatarLetter?: React.CSSProperties;
  inputLabel?: React.CSSProperties;
  inputText?: React.CSSProperties;
  helperText?: React.CSSProperties;
  tooltip?: React.CSSProperties;
  buttonLarge?: React.CSSProperties;
  buttonMedium?: React.CSSProperties;
  buttonSmall?: React.CSSProperties;
}

interface CustomTheme {
  fn: {
    size: (space: number, unit?: string) => string;
    fontSize: (size: number, unit?: string) => string;
    spacing: (
      top: number | string,
      right?: number | string,
      bottom?: number | string,
      left?: number | string,
    ) => string;
  };
}

declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {
    palette: CustomPalette;
  }
  interface ThemeOptions extends CustomTheme {
    palette: CustomPalette;
  }
  interface PaletteColorOptions extends CustomPaletteColorOptions {}
  interface TypographyVariants extends CustomTypography {}
  interface TypographyVariantsOptions extends Partial<CustomTypography> {}
}

declare module '@mui/material/styles/createTheme' {
  interface Theme extends CustomTheme {
    palette: CustomPalette;
  }
  interface ThemeOptions extends CustomTheme {
    palette: CustomPalette;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides
    extends Record<keyof CustomTypography, true> {}
}
