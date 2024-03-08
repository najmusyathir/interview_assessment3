# Creating project in Docker
#1. Prepare your project [eg: FastAPI]

#2. Create "Dockerfile": Refer codes below

#3.  Run batch in project file with this
# >> docker build -t fastapi .
# Note: run on Powershell, cd to where Docker file is located, then WALLA!! Your docker image is created

#TAKENOTE: .dockerignore is used to ignore unused folder like _pycache_
# when run "RUN pip install -r requirements.txt" below, it will install the FASTAPI back


# BELOW HERE IS COPY PASTE CODE: THE SYSTAX OF WHAT TO RUN ON TERMINAL TO LAUNCH THE SYSTEM (FASTAPI)

# Start with a Node.js base image
FROM node:14

# Set the working directory within the container
WORKDIR /app

# Copy the app package and package-lock.json file into the container
COPY package*.json ./

# Install dependencies from requirements.txt
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port that your FastAPI application will run on
EXPOSE 3000
EXPOSE 8080

#This part, I refer chatGPT/Documentaries
# Command to run the FastAPI application using Uvicorn
CMD ["node", "./swagger.js"]



# DOCKER HUB IS LIKE GITHUB BUT TO SAVE DOCKER IMAGE (MUST USE SO RENDER.COM CAN FETCH THE IMAGE)

#Push Docker image to Docker Hub 

# 1. put tag(the version of the system) and rename it with 
# Run:  docker tag created_image_name your_username/your_wanted_image_name:v
# Example: docker tag pc-compatibility-checker-api najmusyathir/pc-compatibility-checker-api:v1.0

# 2. Login into your docker, can be login early in Docker website/software
# Run : docker login

# 3. Push your created docker image
# Run : docker push your_created_docker_name
# Example: najmusyathir/pc-compatibility-checker-api:v1.0
#
# !! Done !!
# Extras:
# Run: Docker images >> to list all your docker available

