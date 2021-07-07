FROM ubuntu:focal

WORKDIR /app

RUN ln -snf /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && echo "Etc/UTC" > /etc/timezone \
    && apt-get update \
    && apt-get upgrade -y \
    && apt-get install texlive-full nodejs npm -y \
    && rm -rf /var/lib/apt/lists/*

# LaTeX packages
RUN tlmgr update --self 


COPY package*.json ./
RUN npm install

COPY ./templates/awesome-cv/ .
COPY . .
EXPOSE 8081

CMD ["npm", "start"]