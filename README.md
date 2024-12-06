# NUS-Fintech-Credit-Scoring-XAI

This is a full stack explainable AI application which allows users to make credit score predictions. It is trained on the german credit scoring dataset, and can use a K-Nearest-Neighbour and Random Forest Algorithm to make predictions, based on user inputs.

Apart from simply making the decision on whether it is a good or bad idea to give a loan to a person with the input traits, it is also able to explain why the decision was made, and which factors played major roles in making this prediction.

## Setup Instructions

### Prerequisites:
1. Have the latest version of Node.js installed on your local machine. You can check the version by typing `node --version` into your CLI.

2. Have docker 27 installed on your local machine. You can check the version by typing `docker --version` into your CLI.

### How to Setup?

1. Get the source code onto your local machine. You can either do so with `git clone https://github.com/Cikguseven/NUS-Fintech-Credit-Scoring-XAI.git` or fork the repository and clone it onto your machine.  

2. In the **backend** directory, perform the following actions:  
  2.1. Ensure that docker is running on your machine, and that you are in the backend directory.  
  2.2. Run `docker build -t credit_scoring_backend:1.0 .` in your CLI. This builds a docker image named credit_scoring_backend, tagged as version 1.0.  
  2.3. Run `docker run -p 8000:8000 credit_scoring_backend:1.0` in your CLI. This creates a docker container based on the image and starts the container. Note that `-p 8000:8000` is important as it maps the container's port 8000 to the machine's port 8000, allowing external access to the container.


3. In the **frontend** directory, perform the following actions:  
  3.1. Add a `.env` file, with the variable `BACKEND_URL="http://127.0.0.1:8000/`.  
  3.2. Run the command `npm install`. This will install the dependencies needed to run the frontend.  
  3.3. Run the command `npm run dev`. This will start the development version of the frontend on your local machine.  
  **Note:** to use the frontend in a production environment, use `next build` and `next start` to build the application for production usage and start a production server, instead of the dev command.

4. Visit `localhost:3000` and you should find your app running.