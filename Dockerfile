FROM node:16
WORKDIR /Users/robertheygate/make-my-day/src
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8000
CMD yarn start:dev