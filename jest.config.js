module.exports = {
  // Transform JavaScript and JSX files using babel-jest
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  // Tell Jest to transform axios
  transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],
  // Specify module file extensions to support
  moduleFileExtensions: ["js", "jsx", "json"],
  // Mock CSS (or non-JS files), map them to an identity proxy
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  // Configure test environment
  testEnvironment: "jsdom",
};
