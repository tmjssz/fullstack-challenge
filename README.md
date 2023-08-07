## Intro

Welcome to the Cozero coding challenge!

Our idea is to offer you a fun and practical challenge so that we can later use it as a conversation starter to go over your thought process.

# Cozero Challenge

We created a very simple MVP for an app where users can signup and list their carbon emission
offsetting projects. The current functionality includes:

- Users can register/login into the app
- Users can post projects
- Anyone can see projects

## Stack

- Frontend: ReactJS
- Backend: NestJS + TypeORM + MySQL.

### Before run

You need:

- Node version >= 12.
- Docker


### How to run

MySQL in Docker
```
docker-compose up -d
```

Backend running on port 3001
```
cd cozero-backend
npm i
npm run dev
```

Frontend running on port 3000
```
cd cozero-frontend
npm i
npm run dev
```

## Requirements

We need to build upon our MVP and fix some bugs.

**Improvements**

- We need to be able to search for projects. Create an API endpoint that searches for projects by their title/description. The API response should be with the same fields as the listing project. 

- Currently, when making a request to create a new project we can omit the listing proposal field. We need to make the field listing proposal required.

- We realized that some of the clients sometimes would mistakenly delete projects.
Our clients are not tech-savvy so it would be great if we can find a way to retrieve
projects that were deleted mistakenly.

**Questions**

- How would you make sure the emails provided from the users are real?
- After running the app for a while, we suddenly get a huge influx of new projects. We currently have over 5.000.000 projects in our database. The response time of the /projects endpoint went from 50ms to 3s. Assuming the frontend is fetching data per language and within specific timeframe (from - to date), what would you do in oder to make the app faster? E.g. request from the frontend -> `GET /projects?language=${lang}&createdAtGreaterThan=${date}&createdAtLowerThan=${date}`
- What else can we do in order to improve the time?
- What kind of metrics would you collect from your application to know that everything is OK?

## How to submit
1. Fork this repository with private visibility and commit your changes there
3. Send an email to your hiring manager with an answer to the questions and a confirmation that you're done with the challenge. We will require you to provide access to your repository to review your challenge

## What happens next
- We'll set up a follow-up call and check with you about your availability

