FROM node:16

WORKDIR /usr/src/app/wallet

COPY . .

RUN yarn
RUN yarn build
RUN npm install -g npm@9.6.2

CMD [ "node", "wallet/dist/src/server.js" ]

EXPOSE 4000