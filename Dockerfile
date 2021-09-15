FROM node:14 as building
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=building /usr/src/app/package*.json ./
RUN npm install --only=prod
COPY --from=building /usr/src/app/dist ./
CMD ["node", "dist/main.js"]