# Translation application

Web application for translation text to sign language

Hosted with Vercel,
link for page: https://lost-translation-samuelahw.vercel.app/

## Technologies

React, Redux, JavaScript, CSS

API: https://github.com/dewald-els/noroff-assignment-api

## Features and requirements

1) Login page - Front page in app where user can login or create user if it doesnt exist using api.
2) Translation page - User can translate text to sign language and text will be stored in api. Translation only accepts alphabets.
3) Profile page - Where user can see their translation history (last 10). Users can also delete/clear their history for current session (not from api). User can log out here.

User cant access translation page or profile page if user is not logged in. User cant access login page if user is logged in. Navigation is done with React Router. App is using React-Redux for state management.
