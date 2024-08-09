# Common build stage
FROM node:14.14.0-alpine3.12 as common-build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
