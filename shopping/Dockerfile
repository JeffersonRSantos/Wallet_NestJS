FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn build

CMD [ "node", "shopping/dist/src/server.js" ]

EXPOSE 3333