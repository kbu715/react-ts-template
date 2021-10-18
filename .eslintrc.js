module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', // let the react version be automatically detected
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    'no-unused-vars': 'off', // turned off rule about disallowing unused variables
    '@typescript-eslint/no-unused-vars': ['error'], 
    '@typescript-eslint/no-var-requires': 'off', // turned off errors for required statements
    'react/prop-types': 'off', // we are using typescript!
    'react/jsx-uses-react': 'off', // turned off errors from eslint complaining if react is not imported in a file 
    'react/react-in-jsx-scope': 'off', 
    '@typescript-eslint/explicit-module-boundary-types': 'off', // turned off errors when the return type is not explicitly specified (type inference is possible : 타입추론가능)
  },
}