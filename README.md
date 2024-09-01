# 📜 Historical Events Web Page

This project was created as part of my studies at Ironhack. The primary focus was on implementing key functionalities, while visual design was not a priority. Despite its minimalist design, the application boasts several robust features that showcase strong technical skills.

## 🌟 Project Overview

**Historical Events Web Page** is a web application where users can explore and contribute to a rich database of historical events. Below are the core features:

### 🔐 User Registration and Authentication

- Users can sign up and create an account on the platform.
- Passwords are securely hashed using **bcrypt** to ensure user data is protected.
- Once logged in, users can add and manage historical events.

### 🕰️ Adding Historical Events

- Authenticated users can add new historical events to the database.
- Each event includes detailed information such as the date, description, and other relevant details.

### 💬 Comment System

- Users can leave comments on historical events.
- Comments are stored in the database and displayed along with the username of the commenter.

### ⭐ Rating System

- Users can rate historical events.
- The application displays both the total number of ratings and the average rating for each event.

### 🛠️ CRUD Operations

- Full CRUD (Create, Read, Update, Delete) operations are implemented for managing historical events.

### 🔍 Search Functionality

- Users can search for historical events by keywords, making it easier to navigate and find specific entries.

## 🛠️ Technologies Used

The project was developed using the following technologies:

- **Frontend**: Handlebars (HBS) for dynamic HTML content generation.
- **Backend**: Express.js as the server framework.
- **Database**: MongoDB for storing event data.
- **Security**: bcrypt for password hashing.
- **Other Tools**: Node.js, Mongoose for database modeling.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:mks1313/Historical-events-CRUD.git

2. **Install dependencies**:

    ```bash
    npm install

3. **Set up environment variables**: Create a **.env** file in the root directory and add your MongoDB connection string and other necessary environment variables. Example **.env** file:

   ```dotenv
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000

4. **Run the application**:

   ```bash
    npm start

 5. **Access the application**: Open http://localhost:3000 in your browser.

🤝 **Contributions**

**Contributions are welcome**! Follow these steps to contribute:

 1. **Fork the repository.**
2. **Create a new branch**:

    ```bash
    git checkout -b feature/your-feature-name

3. **Make your changes and commit them:**

   ```bash
   git commit -m 'Add some feature'

4. **Push to the branch:**

    ```bash
    git push origin feature/your-feature-name

5. **Open a Pull Request.**

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


👤 Author

Maksim Georgiev Marinov - mks1313

📧 Contact

Feel free to reach out if you have any questions or feedback.

## 🌐 Visit the Application

You can access the application at: [Historical Events CRUD](https://historical-events-crud-git-main-maksims-projects-22a788de.vercel.app/)

