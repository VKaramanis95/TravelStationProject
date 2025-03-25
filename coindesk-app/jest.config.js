module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@vue/test-utils": "<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js"
    },
    transform: {
      "^.+\\.vue$": "@vue/vue3-jest",  // Vue 3 Jest transformer
      "^.+\\.js$": "babel-jest"        // Babel for JavaScript files
    }
  };
  