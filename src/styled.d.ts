import 'styled-components';
import type { themesLight } from './configs/theme';

type ThemeType = typeof themesLight;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

