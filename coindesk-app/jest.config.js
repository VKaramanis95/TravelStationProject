module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@vue/test-utils": "<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js"
    },
    transform: {
      "^.+\\.vue$": "@vue/vue3-jest", 
      "^.+\\.js$": "babel-jest"        
    }
  };
  