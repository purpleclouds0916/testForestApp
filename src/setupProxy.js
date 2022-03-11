/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const headers = {
    'Content-Type': 'application/json',
  };
  app.use(
    '/calculation',
    createProxyMiddleware({
      target: 'http://133.97.178.97:21312/',
      changeOrigin: true,
      secure: false,
      headers,
    }),
  );
};
