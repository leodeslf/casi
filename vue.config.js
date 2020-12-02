module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "CASI fx-leodeslf";
        return args;
      });
  }
};
