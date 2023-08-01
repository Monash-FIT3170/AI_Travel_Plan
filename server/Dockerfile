FROM node:17-alpine as build

ENV NODE_ENV dev

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install



EXPOSE 4000
RUN npm run build
CMD ["npm", "run", "start"]

FROM build as tests
RUN npm run test