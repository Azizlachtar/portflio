/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},

	webpack: (config, { isServer }) => {
		// Handle asset/resource types
		config.module.rules.push({
			test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm|txt)$/,
			type: "asset/resource",
			generator: {
				filename: "static/chunks/[path][name].[hash][ext]",
			},
		});

		// Prevent lottie-web from running on the server
		if (isServer) {
			config.externals = {
				...config.externals,
				"lottie-web": "lottie-web",
			};
		}

		// Ensure Webpack doesn't attempt to resolve Node.js modules
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
			path: false,
		};

		return config;
	},
};

module.exports = nextConfig;
