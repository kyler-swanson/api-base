FROM node:slim

RUN apt-get -q update && apt-get -qy install netcat