import builtins from 'rollup-plugin-node-builtins';

export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/data-table.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng.dataTable',
  external: [
    '@angular/animations',
    '@angular/cdk/collections',
    '@angular/core',
    '@angular/common',
    '@angular/flex-layout',
    '@angular/forms',
    '@angular/material',
    'rxjs/BehaviorSubject',
    'rxjs/Observable',
    'rxjs/Subject',
    'rxjs/add/operator/debounceTime'
  ],
  globals: {
    '@angular/animations': 'ng.animation',
    '@angular/cdk/collections': 'ng.cdk',
    '@angular/common': 'ng.common',
    '@angular/core': 'ng.core',
    '@angular/flex-layout': 'ng.flexLayout',
    '@angular/forms': 'ng.forms',
    '@angular/material': 'ng.material',
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx'
  },
  plugins: [
    builtins()
  ]
}
