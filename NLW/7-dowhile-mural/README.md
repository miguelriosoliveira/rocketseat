<p align="center">
   <img src="./.github/logo.svg" alt="DoWhile 2021" width="350"/>
</p>

<p align="center">	
   <a href="https://www.linkedin.com/in/miguelriosoliveira/">
      <img alt="Miguel Rios" src="https://img.shields.io/badge/-miguelriosoliveira-DA319B?style=flat&logo=Linkedin&logoColor=white" />
   </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/miguelriosoliveira/dowhile-mural?color=DA319B" />

  <a href="https://github.com/miguelriosoliveira/dowhile-mural/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/miguelriosoliveira/dowhile-mural?color=DA319B" />
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-DA319B" />
</p>

> :rocket: Full-stack project made so developers can share their thoughts about an upcoming event. Made during the Next Level Week Heat (NLW Heat) #07 by Rocketseat.

<div align="center">
  <sub>The NLW #07 project. Built with ❤︎ by
    <a href="https://github.com/miguelriosoliveira">Miguel Rios</a>
  </sub>
</div>

# :pushpin: Table of Contents

- [Technologies](#computer-technologies)
- [Features](#rocket-features)
- [How to Run](#construction_worker-how-to-run)
- [License](#closed_book-license)

### Web Screenshots

<div>
   <img src="./.github/web.png" width="400px">
</div>

### Mobile Screenshots

<div>
   <img src="./.github/mobile.png" width="180px">
</div>

# :computer: Technologies

This project makes use of the follow technologies:

[![](https://img.shields.io/badge/-TypeScript-%233178c6?style=flat&logo=typescript&logoColor=faf9f8)](https://www.typescriptlang.org/)
[![](https://img.shields.io/badge/-Express-%233D4B57?style=flat&logo=express)](https://expressjs.com/)
[![](https://img.shields.io/badge/-Socket.io-%2318191A?style=flat&logo=socket.io)](https://socket.io/)
[![](https://img.shields.io/badge/-Vite-%23faf9f8?style=flat&logo=vite)](https://vitejs.dev/)
[![](https://img.shields.io/badge/-Expo-%23121212?style=flat&logo=expo&logoColor=faf9f8)](https://expo.io/)

# :rocket: Features

- Website to sign up using GitHub account and post and read thoughts about the upcoming event in real time.
- App to do the same things, but in a mobile view.
- Elixir microservice to generate a word cloud from the posts added by the users.

# :construction_worker: How to run

### 📦 Run API

```bash
# go to server folder
$ cd server

# install dependencies
$ yarn

# run application
$ yarn dev
```

Access API at http://localhost:4000

### 💻 Run Web Project

```bash
# go to web folder
$ cd web

# install dependencies
$ yarn

# run application
$ yarn dev
```

Go to http://localhost:3000 to see the result.

### 📱 Run Mobile Project

To run the mobile project you need a cellphone with the [expo](https://play.google.com/store/apps/details?id=host.exp.exponent) app installed or a android/ios emulator.

```bash
# go to mobile folder
$ cd mobile

# install dependencies
$ yarn

# run application
$ yarn start
```

After this, read the QRCode with the expo app or run on your emulator.

### 📱 Run Word Cloud microservice

```bash
# go to tags_service folder
$ cd tags_service

# install dependencies
$ mix deps.get

# run application
$ mix phx.server
```

Access microservice at http://localhost:4000

# :closed_book: License

This project is under the [MIT license](./LICENSE).

Made with love by [Miguel Rios](https://github.com/miguelriosoliveira) 🚀 • Give a ⭐️ if this project helped you!
