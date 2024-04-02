module.exports = {
    testDir: './tests',
    timeout: 30000,
    use: {
      baseURL: 'http://localhost:3000',
      headless: true,
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    },
  };