// const withTM = require('next-transpile-modules')([
//   '@mui/material',
//   '@mui/system',
//   '@mui/icons-material',
// ]);
//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  reactStrictMode: false,
  // reactStrictMode: true,
  // experimental: {},
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@mui/styled-engine': '@mui/styled-engine-sc',
  //   };
  //   return config;
  // },
};

module.exports = () => {
  const plugins = [withNx];
  return plugins.reduce((acc, next) => next(acc), {
    ...nextConfig,
  });
};
