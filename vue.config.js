module.exports = {
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: process.env.VUE_APP_PORT || 8081,
        https: !process.env.NODE_ENV === 'dev',
    }
}
