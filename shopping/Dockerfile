FROM node:16


WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn build
RUN npm install -g npm@9.6.2

CMD [ "node", "shopping/dist/src/server.js" ]

EXPOSE 4001