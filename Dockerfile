FROM node:alpine

# Container config
EXPOSE 3000
WORKDIR /app

# Setup requirements
COPY package.json .
RUN npm install

# Copy to /app/build
COPY build ./build

CMD npm start
