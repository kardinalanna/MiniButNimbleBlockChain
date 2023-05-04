FROM node
COPY . .
RUN npm install
RUN npm test