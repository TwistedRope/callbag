module.exports = {
  'extends': [
    'airbnb-base'
  ],
  'rules': {
    'no-underscore-dangle': 0,
    'no-console': 0,
    'no-param-reassign': ['error', { 'props': false }],
    'prefer-destructuring': ['error', {
      'AssignmentExpression': {
        'object': false
      }
    }],
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'radix': 0,
  },
};