FROM node:24

WORKDIR /app

RUN npm install -g pnpm@10.33.0

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

RUN pnpm i

COPY . .
