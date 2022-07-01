FROM node:16-alpine
RUN apk add g++ make py3-pip
WORKDIR /build
COPY . /build
RUN yarn

RUN apk del g++ make py3-pip
CMD ["yarn", "start"]
