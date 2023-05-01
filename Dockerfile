From node:16-alpine3.17

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 4010

CMD [ "node", "dist/main.js" ]