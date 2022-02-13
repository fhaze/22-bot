FROM node:latest
WORKDIR /build
COPY . /build
RUN yarn

CMD ["yarn", "start"]
