// jest.config.js
module.exports = {
  preset: 'react-native',
  // 4. You need to add the library to the RegEx below <- Problem Fix
  //    For example, if the error was related to "react-native-elements", you need to add it to the list (as shown below.)
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)',
  ],
};
