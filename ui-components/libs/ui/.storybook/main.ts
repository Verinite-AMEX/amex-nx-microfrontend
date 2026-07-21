import type { StorybookConfig } from '@storybook/angular';
import type { UserConfig } from 'vite';

const config: StorybookConfig & { viteFinal?: (config: UserConfig) => Promise<UserConfig> } = {
  stories: [
    '../src/lib/docs/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs', 
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config: UserConfig) {
    const existingAlias = (config.resolve as { alias?: Record<string, string> })?.alias || {};

    return {
      ...config,
      define: {
        ...config.define,
        STORYBOOK_ANGULAR_OPTIONS: JSON.stringify({}),
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...existingAlias,
          '@storybook/blocks': '@storybook/addon-docs/blocks',
        },
      },
    };
  },
};

export default config;