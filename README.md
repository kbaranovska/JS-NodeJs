# JS-NodeJs

## Getting the Code

To get a local copy of the current code, clone it using:

    $ https://github.com/kbaranovska/JS-NodeJs.git

Next, install Node.js via the [official package](http://nodejs.org).
You need to install all the npm package dependencies running:

    $ npm install


## Check the code

For checking the task you need to run app via command:

    $ npm start

And then open http://localhost:2000.

## Requests
- http://localhost:2000/ - will redirect to main with greeting
- http://localhost:2000/main - displays greeting
- http://localhost:2000/medicals - displays list of medicals in json format
- via Postman (or Fiddler) send post to http://localhost:2000/medicals for adding new one
- http://localhost:2000/medicals/{id} - will show medical by id