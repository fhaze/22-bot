FROM node:16-alpine
WORKDIR /build
COPY . /build
RUN yarn

CMD ["yarn", "start"]
