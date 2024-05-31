const { createProxyMiddleware } = require('http-proxy-middleware');

const BACKEND = 'http://api-wather.plutus-fin.ru/'

module.exports = function(app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: BACKEND,
			changeOrigin: true,
		})
	);
};