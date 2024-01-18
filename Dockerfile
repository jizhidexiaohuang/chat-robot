FROM node:14-alpine

# 设置时区为你所在的时区
ENV TZ=Asia/Shanghai

# 设置系统时区
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 安装 pnpm
RUN npm config set registry "https://registry.npmmirror.com/"

COPY package.json ./

COPY index.js ./index.js

RUN npm install

CMD ["node","index.js"]