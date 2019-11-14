# Dockerfile
FROM node:10.16.3-alpine
LABEL authors="Diego Cañete"

ENV HOME=/usr/src/app
RUN mkdir /usr/src
RUN mkdir $HOME
WORKDIR $HOME

COPY RappiOeste/package.json $HOME
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
COPY RappiOeste/. $HOME

CMD ["npm", "start"]
