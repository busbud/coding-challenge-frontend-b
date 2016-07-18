FROM alpine:3.3
MAINTAINER Marichal Emmanuel

# Define project's folder
VOLUME ["/project/"]

# Update packages
RUN apk update
RUN apk upgrade

# Install node.js, ruby and various dependencies
RUN apk add bash nodejs ruby ruby-dev libffi-dev build-base tzdata libstdc++

# Clean APK cache
RUN rm -rf /var/cache/apk/*

# Install compass
RUN gem install compass --no-rdoc --no-ri

# Install gulp
RUN npm install gulp -g

# Copy npm packages' list to install
COPY package.json  /

# Install npm packages
RUN npm install

CMD ["ln", "-s", "/node_modules", "/project/node_modules"]

# Change current folder
WORKDIR /project



# Run gulp
CMD ["gulp"]
