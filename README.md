# Backend Structure Homework

### :bangbang: Attention  :bangbang:
**The code was written by the professionals for educational purposes. Don't repeat at home.**

### Prerequisites:
1. `npm install`
2.  create `.env` file, copy values from `.example.env`

#### To run the server in local environment with containerized database:
1. `npm run docker:dev:db` (runs database in docker container)
2. `npm run migrate:latest && npm run seed` (run only once, next time you start the server - skip this step)
3. `npm run dev` (runs the server)

#### To run the tests under the fully containerized environment:
1. `npm run docker:test`

### Troubleshooting:
* __Issue__: running the `npm run docker:test` command fails with:
```log
1 error occurred:
        * checking context: can't stat ...
```
* __Solution__: run `sudo chown -R $USER .docker_pgdata_test/` in terminal, while on the repo top level
* __Another solution__: drop all related existing containers and re-run the command
---
* __Issue__: running the `npm run docker:test` command fails with:
```log
failed to solve: failed to solve with frontend dockerfile.v0: failed to build LLB: 
  error from sender: 
    open ./lecture-starter-backend-structure/.docker_pgdata: permission denied
```
* __Solution__: apparently, the `docker:dev:db` command was invoked before, which conflicts with the previously created container data. Simply delete the pg related folder `sudo rm -rf ./docker_pgdata`
