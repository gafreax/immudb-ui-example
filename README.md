# Immudb User Interface 
A simple monorepo to use basic immudb functionalities
Inside the backend folder there's the api code that call immudb. It's developed using
fastify and typescript
Inside the frontend folder there's the UI code developed using react, typescript and 
material-ui library as primary Design System reference.
There's some little customization on it to mathc the color from immudb website 


## Requirement
The requirements for this projects are:
 - node > 18
 - npm
 - docker

Every call to backend need simple header x-immu-db with any value set

## Getting Started

To get started simply use this commands:

```
npm i --workspaces
npm run dev
```

To run it inside docker yoiu can use docker-compose and simply, run:
``` docker-compose up ```

You can reach the frontend on your browser pointing it to http://localhost:3000
There is a simple swagger docs at http://localhost:8000/documentation
## Project Structure: backend
The folder hierarchy is quite simple 
 /lib     ==> contains some helper function
 /routes  ==> contains all the plugin that answers to specific routes 
 /schema  ==> contains all the schema used on fastify route resolver

## Project Structure: frontend
This is the folder hierarchy for the frontend:
/assets     ==> contains assets of the project
/components ==> contains the custom, or material-ui extension of components used on the UI 
/pages      ==> contains the component used for every page exposed by the UI

## License
Copyright 2023 Gabriele Fontana

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Acknowledgements
The project use immmudb immutable databse from https://immudb.io/