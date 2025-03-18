module.exports = {
  apps: [
    {
      name: 'store-app',
      exec_mode: 'cluster',
      instances: 1,
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      watch: false,
      autorestart: false,
      env: {
        PORT: 9798,
        name: 'store-app',
      },
    },
  ],
}
