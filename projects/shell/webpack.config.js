const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// const sharedMappings = new mf.SharedMappings();
//     sharedMappings.register(path.join(__dirname, './tsconfig.json'),
//         ['datastore']
//     );
module.exports = withModuleFederationPlugin({

  // remotes: {
  //   "employees": "http://localhost:4300/remoteEntry.js",
  //   "projects": "http://localhost:4400/remoteEntry.js",    
  // },

  // shared: {
  //   ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  // },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' },
    ),
  },
  sharedMappings: ['datastore']
});
