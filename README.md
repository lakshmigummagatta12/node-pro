# Real-Time Bidding Platform API

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/lakshmigummagatta12/node-pro.git
   cd node-pro

2. Install Dependencies

    npm install

3. Create a .env file in the root directory with the following content:

    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_NAME=your_db_name
    DB_HOST=your_db_host
    JWT_SECRET=your_jwt_secret

4. Run the database migrations:
    npx sequelize-cli db:migrate

5. Start the server:
    npm start

6. Run tests:
     npm test

