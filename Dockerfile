FROM node

WORKDIR /node-shop

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run","prod"]
