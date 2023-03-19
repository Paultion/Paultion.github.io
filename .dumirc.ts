import { IRoute, defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    title: '',
    description: '描述',
    favicons: '/logo.png',
    moreLinks: [
      {
        text: 'Dumi',
        link: 'https://d.umijs.org/'
      },
      {
        text: 'Ant Design',
        link: 'https://ant.design/'
      }
    ],
    actions: [{ type: 'primary', text: '开始使用', link: '/guide/introduce' }],
    features: [{ title: '开箱即用'}, { details: '接入简单，安装即使用，全面融入 Ant Design 5.0 风格。'}]
  },
  alias: {
    common: '/common',
  },
  resolve: {
    atomDirs: [{ type: 'api', dir: 'src' }]
  }
});
