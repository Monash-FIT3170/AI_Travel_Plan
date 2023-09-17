FROM node:17-alpine

ENV NODE_ENV dev
WORKDIR /app

COPY package.json .

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","run","start"]