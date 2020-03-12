FROM node:alpine
RUN apk add --no-cache libstdc++ 
RUN apk add --no-cache python
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "app.js" ]