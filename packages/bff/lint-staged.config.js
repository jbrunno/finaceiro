module.exports = {
  '**/*.ts': [
    'yarn lint:fix',
    () => 'tsc -p tsconfig.json --pretty --noEmit',
    'yarn test --findRelatedTests --passWithNoTests --bail',
  ],
  '*.{js,ts,json}': ['prettier --write'],
};
