# 🛍️ Adil Kadri Perfume E-Commerce Clone

A responsive **perfume e-commerce website clone** built using **React.js, Tailwind CSS, Swiper.js, and LocalStorage**.

This project focuses on creating a modern shopping experience with product browsing, product details, cart management, wishlist functionality, authentication UI, and an admin-style product management interface — all handled on the frontend using browser **LocalStorage**.

## 🚀 Live Demo

**Live Website:**
https://adilkadri-clone-perfume-e-commerce.onrender.com/

## 📌 About the Project

The **Adil Kadri Perfume E-Commerce Clone** is a frontend-focused e-commerce application inspired by modern perfume shopping websites.

The project was developed to practice:

- React component architecture
- React Context API
- Client-side routing
- Responsive UI development
- Product filtering and searching
- Shopping cart functionality
- Wishlist management
- LocalStorage-based data persistence
- Authentication flow
- Admin dashboard functionality
- Responsive product carousels using Swiper

The application is designed to work without a traditional backend by storing user, cart, wishlist, product, and order-related data in the browser's **LocalStorage**.

## ✨ Features

### 👤 User Features

- User signup and login
- User authentication state
- Responsive navigation
- Home page with product sections
- Product listing
- Product details page
- Product search
- Product category browsing
- Add products to cart
- Update cart quantity
- Remove products from cart
- Wishlist functionality
- Add/remove products from wishlist
- User account section
- Checkout interface
- Order confirmation page
- Responsive design for mobile, tablet, and desktop

### 🛒 Shopping Cart

Users can:

- Add products to the cart
- Increase/decrease product quantity
- Remove products
- View total items
- Calculate cart totals
- Continue to checkout

Cart information is persisted using **LocalStorage**, so the cart can remain available after refreshing the page.

### ❤️ Wishlist

The wishlist allows users to:

- Add products to wishlist
- Remove products from wishlist
- View saved products
- Toggle wishlist status directly from product cards

Wishlist data is stored in LocalStorage.

### 🔐 Authentication

The project implements a frontend authentication flow using LocalStorage.

It includes:

- Signup
- Login
- Logout
- User information storage
- Role-based frontend access
- Admin/user distinction

> **Note:** This is client-side authentication for a frontend project. It is not intended to replace secure server-side authentication in a production application.

### 👨‍💼 Admin Features

The project also contains an admin-style interface for managing e-commerce data.

Admin functionality includes interfaces for:

- Dashboard
- Products
- Add products
- Product management
- Orders
- Features

Product and order-related information can be maintained using LocalStorage.

### 🎠 Product Carousels

**Swiper.js** is used to create responsive product sliders and carousels.

The carousel experience is designed to work across:

- Desktop
- Tablet
- Mobile

### 📱 Responsive Design

The application is built with **Tailwind CSS** and is responsive across different screen sizes.

The UI uses:

- Responsive grids
- Flexbox
- Responsive typography
- Mobile navigation
- Responsive product cards
- Responsive carousels
- Mobile-friendly layouts

---

## 🛠️ Technologies Used

| Technology            | Purpose                       |
| --------------------- | ----------------------------- |
| **React.js**          | Building the user interface   |
| **React Router**      | Client-side routing           |
| **Tailwind CSS**      | Responsive styling and UI     |
| **Swiper.js**         | Product sliders and carousels |
| **JavaScript (ES6+)** | Application logic             |
| **Context API**       | Global state management       |
| **LocalStorage**      | Client-side data persistence  |
| **Lucide React**      | Icons                         |
| **React Toastify**    | User notifications            |
| **Vite**              | Development and build tool    |

---

## 🧩 React Concepts Used

This project helped implement several important React concepts:

- Functional components
- Props
- `useState`
- `useEffect`
- `useContext`
- Custom hooks
- Context API
- Conditional rendering
- Component reusability
- Dynamic routing
- Protected routes
- Form handling
- State management
- LocalStorage integration

---

## 📂 Project Structure

```text
src/
│
├── admin/
│   ├── component/
│   │   ├── AdminHeader.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── context/
│   │   └── AdminContext.jsx
│   │
│   ├── pages/
│   │   └── ...
│   │
│   └── AdminLayout.jsx
│
├── auth/
│   ├── CheckAuth.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── UnAuth.jsx
│
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── WishListContext.jsx
│
├── user/
│   │
│   ├── Pages/
│   │   ├── Account.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── PageNotFound.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── SearchFilter.jsx
│   │   └── WishList.jsx
│   │
│   ├── assets/
│   │   └── img/
│   │
│   ├── component/
│   │   ├── CartIcon.jsx
│   │   ├── CartItem.jsx
│   │   ├── Category.jsx
│   │   ├── Collection.jsx
│   │   ├── ComboProducts.jsx
│   │   ├── Footer.jsx
│   │   ├── Founder.jsx
│   │   ├── HeroCarousel.jsx
│   │   ├── Launch.jsx
│   │   ├── Navbar.jsx
│   │   ├── News.jsx
│   │   ├── Options.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── Range.jsx
│   │   ├── TopNav.jsx
│   │   └── Trust.jsx
│   │
│   ├── UserLayout.jsx
│   └── data.js
│
└── ...
```

### Admin Routes

```text
/admin/dashboard
/admin/products
/admin/products/add
/admin/orders
/admin/features
```

---

## 💾 LocalStorage

Since this project does not use a traditional backend, browser LocalStorage is used for client-side persistence.

Example data that can be stored:

```text
user_info
cart
wishlist
orders
products
```

A simplified example:

```javascript
localStorage.setItem("user_info", JSON.stringify(user));
```

To retrieve the stored data:

```javascript
const user = JSON.parse(localStorage.getItem("user_info"));
```

This allows application data to remain available even after a browser refresh.

---

## 🔄 Application Flow

```text
             ┌──────────────┐
             │    Visitor   │
             └──────┬───────┘
                    │
              Login / Signup
                    │
                    ▼
             ┌──────────────┐
             │     User     │
             └──────┬───────┘
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
   Products      Wishlist       Search
       │            │
       ▼            ▼
      Cart ◄──── Wishlist
       │
       ▼
    Checkout
       │
       ▼
Order Confirmation
```

---

## 🧠 State Management

The project uses **React Context API** instead of Redux.

Different contexts are responsible for different application states.

### AuthContext

Handles:

- User login
- User signup
- Logout
- Authentication state
- User information

### CartContext

Handles:

- Add to cart
- Remove from cart
- Quantity updates
- Cart state

### WishlistContext

Handles:

- Add to wishlist
- Remove from wishlist
- Wishlist state
- Wishlist status

### OrderContext

Handles:

- Creating orders
- Storing orders
- Reading order information
- Order status

### AdminContext

Handles admin-related product and management state.

---

## 🎯 Why LocalStorage?

LocalStorage was selected for this project because the goal was to build a **frontend-focused e-commerce application without creating a separate backend**.

Advantages for this project:

- Easy to implement
- No database setup required
- Data survives page refresh
- Useful for frontend practice
- Good for demonstrating client-side state persistence

However, LocalStorage should **not** be used for sensitive production authentication or payment information.

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Manita-123/Perfume-ECommerce-Website.git
```

Navigate to the project:

```bash
cd Perfume-ECommerce-Website
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 📸 Project Highlights

### 🏠 Home Page

- Modern perfume e-commerce layout
- Promotional sections
- Product collections
- Responsive product sliders

### 🛍️ Product Pages

- Product image
- Product title
- Rating
- Reviews
- Price
- Discount information
- Add to cart
- Wishlist

### 🛒 Cart

- Product quantity management
- Remove products
- Total calculation
- Checkout navigation

### ❤️ Wishlist

- Saved products
- Wishlist toggle
- Persistent LocalStorage state

### 👨‍💼 Admin Panel

- Dashboard
- Product management
- Add products
- Orders
- Admin-specific navigation

---

## 📚 What I Learned

While developing this project, I practiced:

- Building reusable React components
- Managing global state with Context API
- Creating protected routes
- Working with React Router
- Implementing shopping cart functionality
- Implementing wishlist functionality
- Persisting application state with LocalStorage
- Building responsive interfaces with Tailwind CSS
- Creating responsive carousels using Swiper
- Managing user and admin UI flows
- Structuring a larger React application
- Deploying a React application

---

## 🔮 Future Improvements

The current project uses LocalStorage for frontend data persistence. Future versions could include:

- Firebase Authentication
- Firebase Firestore
- Node.js/Express backend
- MongoDB database
- Secure server-side authentication
- Real payment gateway integration
- Product image upload
- Server-side product management
- Real-time order tracking
- Product reviews and ratings
- Better search and filtering
- Pagination
- Email order confirmation

---

## ⚠️ Disclaimer

This project is a **frontend learning project / clone** created for educational and portfolio purposes.

It is not affiliated with or officially connected to the original Adil Kadri brand.

The application demonstrates e-commerce functionality using React and browser-based storage rather than a production backend.

---

## 👩‍💻 Author

**Manita Kumari**

Frontend Developer | React.js Developer

- GitHub: https://github.com/Manita-123
- Portfolio: https://manita-portfolio.onrender.com/

---

## ⭐ If You Like This Project

If this project helped you or you found it interesting, consider giving the repository a ⭐ on GitHub.
