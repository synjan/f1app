module.exports = {
  coverageReporters: ["text", "html"],
  reporters: [
    "default",
    ["jest-html-reporter", {
      pageTitle: "F1 Events Test Report",
      outputPath: "test-report/index.html",
      includeFailureMsg: true,
      includeConsoleLog: true
    }]
  ]
};
