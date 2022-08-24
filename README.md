# Cozero Challange

We created a very simple MVP for an app where users can signup and list their carbon emission
offsetting projects. The current functionallity includes:

- Users can register/login to the app
- Users can post projects
- Anyone can see projects

## Stack

- Frontend: NextJS (React)
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

We need to build upon our MVP and possibly fix some bugs.

**Improvements**

- We need to make the field listing proposal required.

- We need to be able to search for projects. On the projects page, we he need a component
that would search by the title and/or the description of the project and it should be done in such way to reuse as much as components on the frontend as possible.

- We realized that some of the clients sometimes would mistakenly delete projects.
Our clients are not tech savvy so it would be great if we can find a way to retrieve
projects that were deleted mistakenly.

**Questions**

- How would you make sure the emails provided from the users are real?
- After running the app for a while, we suddenly get a huge influx of new projects. We currently have over 5.000.000 projects in our database. The response time of the /projects endpoint went from 50ms to 3s. Assuming the frontend is fetching data per language and within specific timeframe (from - to date), what would you do in oder to make the app faster? 
E.g. request from the frontend -> `GET /projects?language=${lang}&createdAtGreaterThan=${date}&createdAtLowerThan=${date}`
- What else can we do in order to improve the time?
- What kind of metrics would you collect from your application to know that everything is OK?
