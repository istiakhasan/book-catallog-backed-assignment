### Live Link: https://book-cattalog-web-backend.vercel.app/

### Application Routes:

#### User

- https://book-cattalog-web-backend.vercel.app/api/v1/auth/signup (POST)
- https://book-cattalog-web-backend.vercel.app/api/v1/users (GET)
- https://book-cattalog-web-backend.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
- https://book-cattalog-web-backend.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
- https://book-cattalog-web-backend.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database
- https://book-cattalog-web-backend.vercel.app/api/v1/profile (GET)

### Category

- https://book-cattalog-web-backend.vercel.app/api/v1/categories/create-category (POST)
- https://book-cattalog-web-backend.vercel.app/api/v1/categories (GET)
- https://book-cattalog-web-backend.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
- https://book-cattalog-web-backend.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (PATCH)
- https://book-cattalog-web-backend.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

### Books

- https://book-cattalog-web-backend.vercel.app/api/v1/books/create-book (POST)
- https://book-cattalog-web-backend.vercel.app/api/v1/books (GET)
- https://book-cattalog-web-backend.vercel.app/api/v1/books/:categoryId/category (GET)
- https://book-cattalog-web-backend.vercel.app/api/v1/books/:id (GET)
- https://book-cattalog-web-backend.vercel.app/api/v1/books/:id (PATCH)
- https://book-cattalog-web-backend.vercel.app/api/v1/books/:id (DELETE)

### Orders

- https://book-cattalog-web-backend.vercel.app/api/v1/orders/create-order (POST)
- https://book-cattalog-web-backend.vercel.app/api/v1/orders (GET) 
- https://book-cattalog-web-backend.vercel.app/api/v1/orders/:orderId (GET)