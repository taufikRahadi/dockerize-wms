FROM node:lts-alpine

WORKDIR /app
COPY package*.json /app
COPY yarn.lock /app
RUN yarn install --check-files

COPY . .

CMD [ "yarn", "watch" ]