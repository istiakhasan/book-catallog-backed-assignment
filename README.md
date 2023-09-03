### Live Link: https://book-cattalog-web-backend.vercel.app/

### Application Routes:
### Auth
- https://book-cattalog-web-backend.vercel.app/api/v1/auth/signup (POST)
- https://book-cattalog-web-backend.vercel.app/api/v1/auth/signin (post)

#### User

- https://book-cattalog-web-backend.vercel.app/api/v1/users (GET)
- https://book-cattalog-web-backend.vercel.app/api/v1/users/faf383f0-cf2d-429e-b74e-41150fa70a3a (Single GET)
- https://book-cattalog-web-backend.vercel.app/api/v1/users/faf383f0-cf2d-429e-b74e-41150fa70a3a (PATCH)
- https://book-cattalog-web-backend.vercel.app/api/v1/users/3ac7a3a3-da7d-468a-8397-c1d7c9fbd18e (DELETE)
- https://book-cattalog-web-backend.vercel.app/api/v1/profile (GET)

### Category

- https://book-cattalog-web-backend.vercel.app/api/v1/categories/create-category (POST)
- https://book-cattalog-web-backend.vercel.app/api/v1/categories (GET)
- https://book-cattalog-web-backend.vercel.app/api/v1/categories/835440b4-1843-43fc-ad53-b403f5b5a2ee (Single GET)
- https://book-cattalog-web-backend.vercel.app/api/v1/categories/835440b4-1843-43fc-ad53-b403f5b5a2ee (PATCH)
- https://book-cattalog-web-backend.vercel.app/api/v1/categories/b83dad0e-88dd-4aeb-be65-44eb722de62f (DELETE)

### Books

- https://book-cattalog-web-backend.vercel.app/api/v1/books/create-book (POST)
- https://book-cattalog-web-backend.vercel.app/api/v1/books (GET)
- https://book-cattalog-web-backend.vercel.app/api/v1/books/835440b4-1843-43fc-ad53-b403f5b5a2ee/category (GET)(get by category id)
- https://book-cattalog-web-backend.vercel.app/api/v1/books/121c5eaa-b962-47f8-8420-7b231fdf502b (GET)
- https://book-cattalog-web-backend.vercel.app/api/v1/books/121c5eaa-b962-47f8-8420-7b231fdf502b (PATCH)
- https://book-cattalog-web-backend.vercel.app/api/v1/books/121c5eaa-b962-47f8-8420-7b231fdf502b (DELETE)

### Orders

- https://book-cattalog-web-backend.vercel.app/api/v1/orders/create-order (POST)
- https://book-cattalog-web-backend.vercel.app/api/v1/orders (GET) 
- https://book-cattalog-web-backend.vercel.app/api/v1/orders/:orderId (GET)