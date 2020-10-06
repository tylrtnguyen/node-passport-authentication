<h2 align="center">
  Node passport authentication
</h2>

## 🚀 Quick start

1.  **Install Node.js using NVM.**
    ```shell
    nvm install node
    ```

2.  **Install the PostgreSQL on Linux**
    ```shell
    # Installation
    sudo apt install postgresql postgresql-contrib
    # Check version
    psql --version
    ```
    **Or you can download from the PostgreSQL [official webiste](https://www.postgresql.org/download/)**
3.  **Create a database and a user and fill in the database.js file**
    ```shell
    # Connect to postgres database
    sudo -u postgres psql
    # Create a database, username and password
    create database YOUR_DB_NAME;
    create user USER_NAME with encrypted password 'YOUR_PASSWORD';
    grant all privileges on database YOUR_DB_NAME to USER_NAME;
    ```
    **If you are on a windows machine, check the connection guide [here](https://www.postgresqltutorial.com/connect-to-postgresql-database/)**

4.  **Install dependencies**
    ```shell
    npm install
    ```

5.  **Start development sever**

    Your site is now running at `http://localhost:3001`!
    ```shell
    npm run start
    ```
    