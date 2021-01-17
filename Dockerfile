FROM node:14.0.0
WORKDIR /website
COPY . /website
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "prod" ]