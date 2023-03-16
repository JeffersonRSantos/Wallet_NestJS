FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn build
RUN yarn start:prod

CMD [ "node", "dist/src/server.js" ]

EXPOSE 3333