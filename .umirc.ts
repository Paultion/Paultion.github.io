import { defineConfig } from 'dumi';

const repo = 'Paultion.github.io';

const logo =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';

export default defineConfig({
  title: repo,
  favicon: logo,
  logo: logo,
  outputPath: 'docs',
  mode: 'doc',
  resolve: {
    // 配置 dumi 嗅探的文档目录
    includes: ['mdx'],
  },
  hash: true,
  // 使用 webpack 5进行构建。
  webpack5: {},
  // 通过 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 API 修改 webpack 配置。
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    memo.cache = {
      type: 'filesystem',
      name: 'dumi',
      buildDependencies: {
        config: [__filename],
      },
      store: 'pack',
    };
    memo.plugins.delete('friendly-error');
    memo.plugins.delete('copy');
  },
  // github page
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  // 自定义样式
  styles: [
    `
    #root .__dumi-default-menu-header p {
      display:none;
    }
    #root .__dumi-default-menu-header h1 {
      font-size: 24px;
      margin: 16px auto;
    }
    `,
  ],
  themeConfig: {
    carrier: '中国移动',
    hd: {
      // 禁用高清方案
      rules: [],
      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/master/packages/theme-mobile/src/typings/config.d.ts#L7
    },
  },
});