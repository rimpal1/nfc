FROM node:12
MAINTAINER Rimpal Suthar <rimpalsuthar@hotmail.com>
EXPOSE 8080
ENV PORT 8080
USER root
WORKDIR /www
COPY package*.json ./
RUN npm install --loglevel silly
COPY . /www
RUN export NODE_ENV=production && npm run build
RUN chown -R 1001:0 /www && chmod -R g+wrx /www
USER 1001
CMD ["/bin/sh", "-c", "npm run start-ocp"]