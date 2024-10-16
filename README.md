# LinkIT

## Langkah-langkah untuk Menjalankan Aplikasi

1. Clone repository ini dengan perintah:
   ```
   git clone https://github.com/username/LinkIT.git
   ```

2. Masuk ke direktori server dan install dependencies dengan perintah:
   ```
   cd LinkIT/server
   npm install
   ```

3. Masuk ke direktori client dan install dependencies dengan perintah:
   ```
   cd ../client
   npm install
   ```

4. Buat file .env di direktori server dan sesuaikan konfigurasi database dengan perintah:

   ```
JWT_SECRET=
PORT=
# cloudinary
Cloudinary_Cloud_name=
Cloudinary_API_key=
Cloudinary_API_secret=
# nodemailer
EMAIL_USER=
EMAIL_PASS=
   ```

5. Buat database dengan perintah:

   ```
   npx sequelize db:create
   npx sequelize db:migrate
   ```

6. Jalankan server dengan perintah:
   ```
   node --watch server.js
   ```

7. Jalankan aplikasi client dengan perintah:
   ```
   npm run dev
   ```

8. Buka browser dan akses aplikasi melalui alamat:
   ```
   http://localhost:5173
   ```