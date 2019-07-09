module.exports = {
  apps: [
    {
      // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
      name: "Express",
      // pm2로 실행될 파일 경로
      script: "./dist/index.js",
      env: {
        api_port: 3001,
        chat_port: 4001
      }
    },
  ]
};