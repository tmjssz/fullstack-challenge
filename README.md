# Cozero Challange

We created a very simple MVP for an app where users can signup and list their carbon emission
offsetting projects. The current functionallity includes:

- Users can register/login to the app
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

We need to build upon our MVP and possibly fix some bugs.

**Improvements**

- Currently anyone can sign in with a wrong email/password combination. They can also visit the post-a-project page and can actually submit project. The project iself won't appear on the frontend or in the database, however users still get a success message when they submit a project. What can we do in order to fix this?

- We are using LocalStorage for saving the authentication details. What can we do better to improve the way we use authentication?

- We need to be able to search for projects. Create an API endpoint that searches for project by their title/description. The API response should be with the same fields as the listing project. 

- We realized that some of the clients sometimes would mistakenly delete projects.
Our clients are not tech savvy so it would be great if we can find a way to retrieve
projects that were deleted mistakenly.

**Questions**

- How would you make sure the emails provided from the users are real?
- After running the app for a while, we suddenly get a huge influx of new projects. We currently have over 5.000.000 projects in our database. The response time of the /projects endpoint went from 50ms to 3s. Assuming the frontend is fetching data per language and within specific timeframe (from - to date), what would you do in oder to make the app faster? 
E.g. request from the frontend -> `GET /projects?language=${lang}&createdAtGreaterThan=${date}&createdAtLowerThan=${date}`
- What else can we do in order to improve the time?
- What kind of metrics would you collect from your application to know that everything is OK?
- How would you deploy this application?
