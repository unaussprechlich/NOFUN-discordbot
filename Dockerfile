FROM node:alpine

COPY . .

RUN ls
RUN npm install --production

CMD [ "node", "index.js" ]

