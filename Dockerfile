FROM node:alpine

COPY . .

ENV NPM_CONFIG_LOGLEVEL warn

RUN ls
RUN npm install --production

CMD [ "node", "index.js" ]

