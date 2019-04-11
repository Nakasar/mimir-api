FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 80

ENV PORT 80

CMD npm start
