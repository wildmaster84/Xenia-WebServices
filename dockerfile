FROM node:lts-alpine

WORKDIR /xenia-web-service

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV API_PORT=36000
# MongoDB on host system or container (27018)
ENV MONGO_URI=mongodb://host.docker.internal:27017/
ENV SWAGGER_API=true
ENV nginx=true

EXPOSE 36001

CMD [ "npm", "start" ]
