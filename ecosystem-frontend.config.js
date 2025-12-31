module.exports = {
  apps: [{
    name: 'bus-tracker-frontend',
    script: 'serve',
    args: '-s build -l 3000',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/pm2-frontend-error.log',
    out_file: './logs/pm2-frontend-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};

