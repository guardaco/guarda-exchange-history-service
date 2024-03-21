module.exports = {
    apps : [{
      name: "exchange-service",
      script: "node",
      args: "dist/main",
      watch: true,
      ignore_watch : ["node_modules", "logs"],
      autorestart: true,
      restart_delay: 10000,
      env_development: {
        NODE_ENV: "development",
      },
      env_test: {
        NODE_ENV: "test",
      },
      env_production: {
        NODE_ENV: "production",
      },
      env_file: '.env',
      log_file: "logs/exchange-combined.log",
      out_file: "logs/exchange-out.log",
      error_file: "logs/exchange-err.log",
      time: true
    }]
  }
  