# CTORRUBIA - Northcoders News Front-End : The Hive

## Background

**CTORRUBIA - Northcoders NC_News** is a [React.js](https://react.dev/) front-end app for a Reddit-style news website. This project has been complemented by a previous [back-end API](https://github.com/SirPhoros/CTorrubia-News-Solo_Project-NC) built during the same course. The purpose here was to mimic the functionality of a news portal (such as reddit) with the help of previously-made API.

The front end application was constructed using _React_.

The database used was _PSQL_, and interactions have been carried out using _node-postgres_.

> A live version can be accessed here: https://nc-news-soloproject-be.onrender.com/

Written by [Cristóbal G. Torrubia](https://github.com/SirPhoros). Latest version 1.0.0 (02 Jun 2023).

This project has been part of the Northcoders bootcamp, 27th March 2023 - 23rd June 2023.

---

## Set-up guide

If you want to run locally this project, you will need to use Node.

### 1. Clone the repo

In order to clone this repo use the following:

```
$ git clone https://github.com/SirPhoros/CTorrubia_nc-news_FE
```

If you would like to make changes to this repo yourself, fork the repo then clone it.

---

### 2. Install dependencies

To run the app locally, you will need Node.

```
$ npm install
```

Node minimum version should be: [Node.js v19.7.0](https://nodejs.org/en/download/). Also, it is important to check the `package.json` file, and see whether you have within your dependencies `axios` and `react`; if not, you may want to install the following dependencies.

```
$ npm i react
$ npm i react-router-dom
$ npm i axios
```

However, it should not be needed, as everything is handled by `@vite`.

---

### 3. Run dev site locally

Thanks to `@Vite` we are able to run the app locally by means of the following command:

```
$ npm run dev
```

After doing that, in your console a similar message should display:

```
 VITE v4.3.9  ready in 311 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Now you can click on the link provided, or browse in your browser [http://localhost:5173/](http://localhost:5173/). Depending on your port availability, it may vary. Please, check your console for more information.

---

### Using The Hive

As part of the bootcamp requirements the front end application had to satisfy the following user stories:

```
1) View a list of all articles
2) View a separate page for each topic with a list of related articles
3) View an individual article
4) Vote on an article (upvote and downvote, with a single vote)
5) View a list of comments associated with an article
6) Post a new comment to an existing article - for a valid user
7) Sort articles based on: date, comment count, number of votes
8) Order articles in ascending or descending order
9) Delete comments - for a valid user (it will be provided for you)
10) Have responsive error handling for invalid URL paths
```

---

## Useful links:

The following link will take you to the hosted version of this project:

App[link to app]

The following links will take you to the back end API, and back end repo:

[https://nc-news-soloproject-be.onrender.com/](https://nc-news-soloproject-be.onrender.com/)

> Due to the free-tier of Render, it may take a couple of minutes to make the first request to the API. Please, be considerate.

[https://github.com/SirPhoros/CTorrubia_nc-news_FE](https://github.com/SirPhoros/CTorrubia_nc-news_FE)

The following link will take you to the creators github & LinkedIn profile:

GitHub: [https://github.com/SirPhoros](https://github.com/SirPhoros)<br />
LinkedIn: [Cristóbal Gutiérrez Torrubia](https://www.linkedin.com/in/cgtorrubia/)

---

Copyright (c) 2023 - [Cristóbal Gutiérrez Torrubia](https://www.linkedin.com/in/cgtorrubia/)
