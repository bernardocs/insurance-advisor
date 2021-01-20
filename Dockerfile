FROM node:12.20.1
LABEL maintainer="bernardo.csantos@gmail.com"

COPY . /app

WORKDIR /app

RUN npm i --production

CMD ["npm", "start"]