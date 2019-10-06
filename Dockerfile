FROM node:8

WORKDIR /opt/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
