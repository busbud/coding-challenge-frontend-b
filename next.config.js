const path = require('path')

module.exports = {
  sassOptions: {
    prependData: `
        @import "variables";
      `,
    includePaths: [path.join(__dirname, 'src/styles')],
  },
}
