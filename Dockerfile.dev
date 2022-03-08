FROM node:12-alpine

WORKDIR /app
COPY package.json .
RUN npm install
ENV REACT_APP_SKIP_PREFLIGHT_CHECK=true
COPY . .

CMD ["npm", "run", "dev"]