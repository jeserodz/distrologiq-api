FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install

# Bundle app source
COPY . .

CMD [ "node", "dist/main" ]
