import reactRefresh from '@vitejs/plugin-react-refresh'

export default {
  plugins: [reactRefresh()],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    },
  proxy: {
      '/query': {
        target: 'https://wlback.ecs162-s22.repl.co/', // changed here
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
}
