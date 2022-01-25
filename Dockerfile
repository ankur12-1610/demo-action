FROM node:latest

COPY . .

RUN npm install --production

ENTRYPOINT [ "node", "/dist/index.js" ]