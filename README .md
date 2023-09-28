## BooK Listing Backend

### Routes

#### Auth User

```
https://book-listing-prisma-sql-backend.vercel.app/api/v1/auth/signup (post)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/auth/signin (post)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/users (get)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/users/1d59b8e8-1ac2-4a81-89b3-6b8724facf83 (get one)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/profile (get)

```

#### Category

```
https://book-listing-prisma-sql-backend.vercel.app/api/v1/categories/create-category (post)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/categories (get)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/categories/3f4da7a1-6f3d-402d-8137-a69b78867684 (get one)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/categories/4e42aaef-b459-4e8d-a64c-950672b5c09c (patch)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/categories/4e42aaef-b459-4e8d-a64c-950672b5c09c (delete)


```

#### Book

```
https://book-listing-prisma-sql-backend.vercel.app/api/v1/books/create-book (post)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/books (get)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/books/d618fd09-48a7-45b5-8116-922e7e8d6371 (get one)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/books/3f4da7a1-6f3d-402d-8137-a69b78867684/category (get by category)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/books/afc2b0bb-9396-4417-a23f-b68e79804ffa (patch)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/books/afc2b0bb-9396-4417-a23f-b68e79804ffa (delete)
```

#### Orders

```
https://book-listing-prisma-sql-backend.vercel.app/api/v1/orders/create-order (post)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/orders (get)
https://book-listing-prisma-sql-backend.vercel.app/api/v1/orders/af2f2266-9617-4a9b-afdc-b7a0c49f822b (get one)
```
