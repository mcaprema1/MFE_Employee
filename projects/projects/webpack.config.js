const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// const sharedMappings = new mf.SharedMappings();
//     sharedMappings.register(path.join(__dirname, './tsconfig.json'),
//         ['datastore']
//     );

module.exports = withModuleFederationPlugin({

  name: 'projects',

  exposes: {
    // './Component': './projects/projects/src/app/app.component.ts',
    './Module': './projects/projects/src/app/projectinput/projectinput.module.ts'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  // shared: share({
  //   "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
  //   "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
  //   "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
  //   "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  //   "@angular/store": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  //   ...sharedMappings.getDescriptors()
  // })
  sharedMappings: ['datastore']

});
