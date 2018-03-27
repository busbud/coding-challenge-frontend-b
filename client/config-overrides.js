const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', style: true }],
    config
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      //'@heading-color': 'white',
      'link-color': 'white',
      '@primary-color': '#f19020',
      '@layout-header-height': '20',
      '@layout-sider-background': 'grey',
      '@layout-body-background':
        'linear-gradient(180deg,#2880bc 0,#2880bc 22%,#7abdc3 33%,#9bbea5 44%,#d3ad6c 55%,#e7717f 72%,#e7717f)',
      '@layout-header-background':
        'grey url(/assets/img/concert.jpg) center / cover no-repeat',
      '@layout-footer-background': '#e7717f'
    }
  })(config, env);
  return config;
};
