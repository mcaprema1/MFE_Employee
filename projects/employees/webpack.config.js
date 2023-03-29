const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'employees',

  exposes: {
    // './Component': './projects/employees/src/app/app.component.ts',
    './Module': './projects/employees/src/app/employee/employee.module.ts'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' },
    ),
  },
  sharedMappings: ['datastore']
  
});
