module.exports = {
  apps: [
    {
      name: "tenura-portfolio",
      script: "npm",
      args: "start",
      cwd: "/opt/tenura-portfolio",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        PM2_HOME: "/home/portfolio-deploy/.pm2",
      },
    },
  ],
};
