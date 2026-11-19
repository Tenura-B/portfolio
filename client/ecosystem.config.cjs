module.exports = {
  apps: [
    {
      name: "tenura-portfolio",
      cwd: "/opt/tenura-portfolio",
      script: "npm",
      args: "start -- -p 3020",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: "3020"
      }
    }
  ]
};
