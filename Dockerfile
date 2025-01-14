# Menggunakan Node.js versi LTS sebagai base image
FROM node:18-alpine

# Menentukan direktori kerja dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Instal dependencies
RUN npm install

# Menyalin seluruh kode aplikasi ke dalam container
COPY . .

# Meny expose port yang digunakan aplikasi
EXPOSE 3000

# Menjalankan aplikasi menggunakan script yang didefinisikan
CMD ["npm", "run", "dev"]
