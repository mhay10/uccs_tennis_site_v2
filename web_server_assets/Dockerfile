FROM node:20

## ------- ZROK ------- ##

# Copy zrok install script
WORKDIR /zrok
COPY install_zrok.sh .

# Add zrok program to image
RUN DEBIAN_FRONTEND=noninteractive apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install curl jq -y

# Install zrok
RUN chmod +x install_zrok.sh
RUN ./install_zrok.sh

# Save zrok login token
ARG zrok_token
ENV ZROK_TOKEN=${zrok_token}

# Save zrok reserved domain
ARG zrok_domain
ENV ZROK_DOMAIN=${zrok_domain}


## ------- ASSET SERVER ------- ##

# Copy asset server files
WORKDIR /app
COPY . .

# Filter zrok scripts
RUN rm install_zrok.sh
RUN chmod +x enable_zrok.sh

# Install dependencies
RUN npm install

# Start asset server and zrok tunnel
CMD ./enable_zrok.sh && npm run start
