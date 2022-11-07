/**
 * Restore back to the following import when issues are fixed:
 * const { withNx } = require('@nrwl/next/plugins/with-nx');
 *
 * Issues:
 * https://github.com/nrwl/nx/pull/13006
 * https://github.com/nrwl/nx/pull/12973
 * https://github.com/nrwl/nx/pull/12973/commits/3936b6e6554524433bd552f5f102765fffad5b3c
 *
 * Also remove temporary file.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('./with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
    });
    return config;
  },
};

module.exports = withNx(nextConfig);
