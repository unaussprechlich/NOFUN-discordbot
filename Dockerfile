FROM node:latest

COPY . .

RUN ls
RUN npm install --production

CMD [ "node", "index.js" ]