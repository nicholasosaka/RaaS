FROM ubuntu:focal

RUN ln -snf /usr/share/zoneinfo/Etc/UTC /etc/localtime && echo "Etc/UTC" > /etc/timezone 
RUN apt-get update && apt-get install -y
RUN apt-get install texlive-latex-recommended -y

EXPOSE 8080
CMD ["latex", "--version"]