FROM node:16.14.0
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

RUN npm install

RUN npm install --frozen-lockfile

COPY . /dist

COPY --chown=node:node . .

RUN npm run build-qa

USER node

EXPOSE 8081

CMD ["tail","-f","/dev/null"]

# docker build -t backoffice:latest .  
# docker run -p 8081:8081 backoffice
# docker-compose up 