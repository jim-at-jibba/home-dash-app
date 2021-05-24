FROM node:12.17.0-alpine

WORKDIR /app

# copy source files
COPY . /app
ENV NEXT_PUBLIC_CLOUDINARY_KEY="718559536646772"
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="zilla"

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start