

# prisma notes
# Install and initialize Prisma
npm install prisma --save-dev
npx prisma init

# Edit prisma/schema.prisma

# Generate client
npx prisma generate

# Push to DB or migrate
npx prisma db push
# or
npx prisma migrate dev --name init

# MONGO: Once the replica set is enabled, Prisma will be able to perform transactions and create records without error.
brew services stop mongodb-community
mongod --dbpath /usr/local/var/mongodb --replSet rs0
