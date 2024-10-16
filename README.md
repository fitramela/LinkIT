# LinkIT

## Steps to Run the Application

1. Clone this repository using the command:
   ```
   git clone https://github.com/username/LinkIT.git
   ```

2. Navigate to the server directory and install dependencies with the command:
   ```
   cd LinkIT/server
   npm install
   ```

3. Navigate to the client directory and install dependencies with the command:
   ```
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory and configure the database settings as follows:
   ```
   JWT_SECRET=your_jwt_secret
   PORT=your_port_number
   # Cloudinary configuration
   Cloudinary_Cloud_name=your_cloud_name
   Cloudinary_API_key=your_api_key
   Cloudinary_API_secret=your_api_secret
   # Nodemailer configuration
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

5. Create the database using the following commands:
   ```
   npx sequelize db:create
   npx sequelize db:migrate
   ```

6. Start the server with the command:
   ```
   node --watch server.js
   ```

7. Start the client application with the command:
   ```
   npm run dev
   ```

8. Open your browser and access the application at:
   ```
   http://localhost:5173
   ```