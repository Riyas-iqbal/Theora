# Theora - Learning Management System Web Application.

Theora is a powerful learning management system (LMS) web application built using the MERN stack (MongoDB, Express, React, Node.js). It provides a dynamic and intuitive platform for learners and tutors to connect, collaborate, and explore a wide range of courses.

## Key Features

- **Intuitive Course Creation:** Easily create and upload courses using our user-friendly course creation tools.
- **Global Reach:** Connect with learners from around the world and make a positive impact on their learning journey.
- **Robust Analytics:** Track course performance with detailed analytics to optimize your teaching and learning outcomes.
- **Dedicated Support:** Our dedicated support team is available to assist you at every step of your journey.

## Installation


To run Theora locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Riyas-iqbal/Theora.git`
2. Install dependencies: `cd theora/server && npm install`
3. Create a logs folder in the root directory: `mkdir logs`
3. Set up environment variables: Create a `.env` file based on the provided `.env.example`.
4. Start the server: `npm run dev`
5. Open the app in your browser: `http://localhost:3000`

## Usage

1. Sign up as a tutor to create and manage your courses.
2. Explore the course categories to find courses of interest.
3. Enroll in courses, track your progress, and engage with other learners.
4. Stay updated with newsletters, latest course releases, and announcements.

## Project Structure

```
src\
 |--config\         # configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--repository\     # Data access layer (Mongoose queries)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

List of available routes:

**Auth routes**:\
`POST /api/auth/signup` - register\
`POST /api/auth/signin` - login\
`GET /api/auth/token` - refresh auth tokens\
`GET /api/auth/user-restore` - restore user details from access token\
`DELETE /api/auth/logout` - Clear access and refresh token\

`POST /api/auth/token/signup` - register tutor\
`POST /api/auth/token/signin` - tutor login \access token\
`DELETE /api/auth/tutor/logout` - Clear access and refresh token\

**Course routes**:\
`POST /api/tutor/courses/create` - create a new course by logged in tutor\
`GET /api/tutor/courses` - get all courses by logged in tutor\
`GET /api/tutor/courses/:id` - get specific course currenly logged in tutor\
`GET /api/user/courses?query` - get all courses\
`GET /api/user/courses/enroll` - get all courses enrolled by the current user\
`POST /api/user/courses/enroll/:id` - get specific course details with total students enrolled\

**Lesson routes**:\
`POST /api/tutor/lessons` - add a new lesson to the provided course\
`POST /api/tutor/lessons` - adds a new lesson to the course\
`GET /api/user/lessons` - get lesson in a specific course\

**Tutor routes**:\
`POST /api/tutor/details/top` - returns the top 5 tutors\

**User routes**:\
`GET /api/user/details` - create user details\
`POST /api/user/details` - update user details\
`GET /api/user/details/enrolled/:id/check` - check if a user is enrolled for specific course\

**Order routes**:\
`GET /api/user/orders` - get all orders by user\
`POST /api/user/orders/create` - create new order\
`POST /api/user/payment/verfiy` - verify the payment created\

**Admin routes**:\
`GET /api/admin/users` - get all users details\
`POST /api/admin/users/block` - block specific user\
`POST /api/admin/users/unblock` - unblock specific user\
`GET /api/admin/tutors` - get all tutors details\
`POST /api/admin/tutors/block` - block specific tutor\
`POST /api/admin/tutors/unblock` - unblock specific tutor\
`GET /api/admin/category` - get all categories\
`POST /api/admin/category` - create a new category\

**Test route**:\
`POST /api/test` - test route api\



## Contributing

Contributions to Theora are welcome! If you have any bug reports, feature requests, or suggestions, please open an issue or submit a pull request. 

## Acknowledgements

- This project was inspired by the love for learning and the desire to create a platform for knowledge sharing.

## Contact

For any inquiries or support, please reach out to our team at [riyasiqbal10@gmail.com](mailto:riyasiqbal10@gmail.com).
