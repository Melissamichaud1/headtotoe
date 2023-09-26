# Head to Toe

Team:

- Melissa Michaud - Hats microservice
- Joe Lock - Shoes microservice

# **Getting the App Started**

---

1. Git clone into your local repository
   `git clone <<repo>>`
2. cd into it
   `cd headtotoe`
3. Create a volume and name it postgres-data
   `docker volume create pgdata`
4. Build the image
   `docker compose build`
5. Run the containers
   `dokcer compose up`
6. Open browser to http://localhost:3000 to make sure it's running (it may take a minute or two)
7. Once it's up and running, you can begin inputting data. You can access everything via the dropdowns on the NavBar
