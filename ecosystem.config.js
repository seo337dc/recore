module.exports = {
  apps: [
    {
      name: 'recore',
      script: './server.js',
      instances: 0,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
      combine_logs: true,
    },
  ],
};
