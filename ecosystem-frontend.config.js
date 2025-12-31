module.exports = {
  apps: [{
    name: 'bus-tracker-frontend',
    script: 'npx',
    args: 'serve -s build -l 3000',
    cwd: '/root/BusTrackerFront-end',
    env: {
      NODE_ENV: 'production'
    },
    error_file: '/root/BusTrackerFront-end/logs/pm2-frontend-error.log',
    out_file: '/root/BusTrackerFront-end/logs/pm2-frontend-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
};

