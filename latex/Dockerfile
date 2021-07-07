FROM ubuntu:focal

WORKDIR /app

RUN ln -snf /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && echo "Etc/UTC" > /etc/timezone \
    && apt-get update \
    && apt-get upgrade -y \
    && apt-get install texlive-latex-base texlive-latex-extra texlive-fonts-recommended xzdec -y \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get install nodejs npm -y

# LaTeX packages
RUN tlmgr install enumitem

COPY package*.json ./
RUN npm install

COPY ./templates/awesome-cv/ .
COPY . .
EXPOSE 8081

CMD ["npm", "start"]