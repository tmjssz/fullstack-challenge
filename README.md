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

  First, I would add validation for the email field, e.g. by adding typeorm's [@IsEmail() decorator](https://orkhan.gitbook.io/typeorm/docs/validation) to the field in the user entity. To ensure that the email is authentic and owned by the user, I would implement an email verification process. After the signup, a confirmation email would be sent to the address provided, and only if the user has access to that email account could the registration process be completed. To verify this, the confirmation email would contain a link with a JWT token linked to the user's account. Upon clicking the link, our API would be called with the token to mark the email address as verified. Another option would be sending a one-time password in the confirmation email instead of a link. The user would have to log in with that password and then choose a new password.

- After running the app for a while, we suddenly get a huge influx of new projects. We currently have over 5.000.000 projects in our database. The response time of the /projects endpoint went from 50ms to 3s. Assuming the frontend is fetching data per language and within specific timeframe (from - to date), what would you do in oder to make the app faster? E.g. request from the frontend -> `GET /projects?language=${lang}&createdAtGreaterThan=${date}&createdAtLowerThan=${date}`

  I would create an index for the createdAt field to speed up database queries with conditions for this field. We would also need to store the language in the database to be able to filter on this attribute. Assuming we added an additional language field to the project entity, we could create a multi-column index for language and createdAt to make lookups for queries with conditions on both fields even faster. Typeorm supports indices: https://orkhan.gitbook.io/typeorm/docs/indices.

- What else can we do in order to improve the time?

  We could cache queries in the backend, to reduce the number of actual database lookups. For the lifetime of the cache the server would return the cached data, instead of querying the database for each individual request. Typeorm supports this: https://orkhan.gitbook.io/typeorm/docs/caching.

  Additionally, we could consume the data in parts to reduce the size of the responses and thus the transmission time. One way to do this would be to introduce pagination in the app, where only a maximum number of project items are requested per page. Alternatively, we could implement dynamic reloading of new items as the user scrolls through the list. We would then need to extend our API endpoint accordingly to request the individual chunks of data. I would introduce the following query parameters for this: `GET /projects?offset=${offset}&limit=${limit}`.

- What kind of metrics would you collect from your application to know that everything is OK?

  I would collect the following metrics:
    - CPU usage
    - Memory usage
    - Average response time (latency)
    - Peak response time
    - Average DB query time
    - Number of requests per second (throughput)
    - Number of responses by status code (5XX, 4XX, 3XX, 2XX)
    - Errors per minute (error rate)
    - Uptime

## How to submit
1. Fork this repository with private visibility and commit your changes there
3. Send an email to your hiring manager with an answer to the questions and a confirmation that you're done with the challenge. We will require you to provide access to your repository to review your challenge

## What happens next
- We'll set up a follow-up call and check with you about your availability

