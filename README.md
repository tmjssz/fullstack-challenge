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
- MySQL - you can view/change the configs in cozero-backend/.env file.


### How to run


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

**Bugs**

- Currently anyone can access the page to edit products. It is not possible
to edit the projects by anyone but its not a good look because the edit page itself
contains data that might be sensitive. Ideally the page to edit the projects won't
be available to the public

- When adding new projects one of the fields called "Listing Proposals" is not 
show but also it seems its empty when we are editing the project. Ideally we would
like that field to be shown and to be editable.


**Improvements**

- We need to be able to search for projects. On the projects page, we he need a component
that would search by title of the project and it should be done in such way to reuse as much as
components on the frontend as possible.

- We realized that some of the clients sometimes would mistakenly delete projects.
Our clients are not tech savvy so it would be great if we can find a way to retrieve
projects that were deleted mistakenly.

**Questions**

- How would you make sure this app is reliable and how would you keep track of 
the performance of it?