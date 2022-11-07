export const themeConfig = {
  color: {
    bg: {
      primary: '#09B509',
      secondary: '#1F58A5',
      info: 'rgba(255, 255, 255, 0.3)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      info: '#333333',
    },
  },
  spacing: 8,
  breakpoints: {
    sm: 400,
    md: 940,
    lg: 1400,
  },
  container: {
    maxWidth: 1024 + Math.floor(256 / 2),
  },
};

export const resolveBgColor = (type: string) => themeConfig.color.bg[type];

export const resolveTextColor = (type: string) => themeConfig.color.text[type];

export const spacing = (i = 1) => Math.floor(i * themeConfig.spacing);

export const desktop = (args) => `
  @media only screen and (min-width: ${themeConfig.breakpoints.md}px) {
    ${args}
  }
`;

export const shadow = () => `box-shadow: 0 0 30px 0 rgb(0 0 0 / 16%);`;
