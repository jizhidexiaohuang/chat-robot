const axios = require("axios");
const cron = require("node-cron");

// 定时任务触发函数
function sendScheduledMessage(type) {
  const webhookUrl =
    "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=28b11b60-70d7-48f1-b9c0-475c469355b9"; // 替换为你的机器人的 Webhook URL

  const writeLog = {
    msgtype: "text",
    text: {
      content: "写日志啊！ http://172.18.0.103:32363/#/home/task",
      mentioned_list: ["@all"],
    },
  };
  const clockIn = {
    msgtype: "text",
    text: {
      content:
        "记得打卡！顺便check一下昨天有没有写日志！ http://172.18.0.103:32363/#/home/task",
      mentioned_list: ["@all"],
    },
  };
  const writeMonthlySummary = {
    msgtype: "text",
    text: {
      content: "写月总结啊！ http://hrm.c2cloud.cn/pront/",
      mentioned_list: ["@all"],
    },
  };

  const message =
    type === "log"
      ? writeLog
      : type === "clockIn"
      ? clockIn
      : writeMonthlySummary;
  console.log(message);
  axios
    .post(webhookUrl, message)
    .then((response) => {
      console.log("消息发送成功" + new Date().toLocaleTimeString());
    })
    .catch((error) => {
      console.error("消息发送失败", error);
    });
}

console.log("启动....");
// 设置定时任务，每天的 17:55 发送消息
cron.schedule("50 17 * * 1-5", () => {
  sendScheduledMessage("log");
});

// 设置定时任务，每天的 8:55 发送消息
cron.schedule("50 8 * * 1-5", () => {
  sendScheduledMessage("clockIn");
});

// 设置定时任务，每月最后一天的 17:30 发送消息
cron.schedule("30 17 28-31 * *", () => {
  const today = new Date();
  const lastDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  if (today.getDate() === lastDayOfMonth) {
    sendScheduledMessage("monthlySummary");
  }
});
