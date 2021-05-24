FROM node:12.17.0-alpine

WORKDIR /app

# copy source files
COPY . /app
COPY .env.development .env

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start