const CracoAntDesignPlugin = require('craco-antd');
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.resolve(
          __dirname,
          'src/theme/variables.less'
        )
      }
    }
  ]
};
