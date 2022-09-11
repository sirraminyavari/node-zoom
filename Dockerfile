FROM ubuntu:20.04

ARG BUILD_DATE
ARG VCS_REF
ARG DEBIAN_FRONTEND=noninteractive
ARG DIR_NAME=node-zoom

EXPOSE 3001

COPY ./ /$DIR_NAME

RUN apt-get update \
	&& apt-get install -y libyaz5 libyaz-dev lsb-release pkg-config wget gnupg nodejs npm

RUN sed -i 's/\r$//' $DIR_NAME/preinstall_docker.sh \
	&& chmod +x $DIR_NAME/preinstall_docker.sh \
	&& ./$DIR_NAME/preinstall_docker.sh
	
WORKDIR /$DIR_NAME

RUN npm install \
	&& npm run-script install

CMD npm start