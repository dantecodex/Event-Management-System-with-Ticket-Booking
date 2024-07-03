# Event Management System

## Overview

The Event Management System is a comprehensive web application designed to facilitate event creation, ticket booking, management, and real-time communication through live chat. It allows users to create events, purchase tickets, manage their events, and provides secure authentication and error handling mechanisms. Participants can engage in live chat during events, enhancing interaction and collaboration among attendees.

## Features

- **Event Creation**: Users can create events with details such as name, location, date, and price.
- **Ticket Purchase**: Users can purchase tickets for events, specifying the quantity and price.
- **User Authentication**: Sign up, log in, and log out functionality with JWT authentication.
- **Password Reset**: Users can request a password reset if they forget their password.
- **Email Confirmation**: Confirmation emails are sent to users upon successful ticket purchase.
- **Live Chat Integration**: Real-time chat functionality for event attendees using Socket.IO.
- **Error Handling**: Comprehensive error handling with custom error messages.
- **Responsive Design**: Mobile-friendly interface for seamless user experience across devices.

## Working of the Application

### Event Creation

1. **Creating an Event**: Users can navigate to the event creation page where they fill out a form with details like event name, location, date, and price.
2. **Submitting the Form**: After filling out the form, users can submit it to create the event.
3. **Event Confirmation**: Upon successful creation, users receive a confirmation message and can view the newly created event on the homepage.

### Ticket Purchase

1. **Browsing Events**: Users can browse available events on the homepage or through a dedicated browse events page.
2. **Selecting an Event**: Upon finding an event they're interested in, users can click on it to view more details.
3. **Purchasing Tickets**: Users can specify the quantity of tickets they want to purchase and proceed to the payment page.
4. **Payment Confirmation**: After successful payment, users receive a confirmation message and an email containing their ticket details.

### User Authentication

1. **Sign Up**: New users can create an account by providing their name, email, and password. Upon successful sign-up, they are redirected to the authentication page.
2. **Log In**: Registered users can log in using their email and password. Upon successful login, they are redirected to their homepage.
3. **Log Out**: Users can log out of their accounts at any time, terminating their current session.

### Password Reset

1. **Forgot Password**: Users who forget their password can request a password reset by providing their email address.
2. **Reset Link**: Upon request, users receive an email containing a link to reset their password.
3. **Reset Password**: Clicking on the reset link directs users to a page where they can enter a new password and confirm it.

### Live Chat Integration

- **Real-time Communication**: Utilizes Socket.IO for real-time communication between event attendees.
- **Chat History**: Users can view chat history related to specific events upon joining a chat room.

### Error Handling

- **Comprehensive Error Messages**: The application provides clear error messages for various scenarios, such as invalid credentials, duplicate events, and failed payments.
- **Global Error Handling**: Custom error handling middleware ensures that errors are properly caught and handled throughout the application.

### Responsive Design

- **Mobile Compatibility**: The application is designed to be responsive, ensuring optimal user experience across devices, including desktops, tablets, and smartphones.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database used with Mongoose ODM.
- **EJS**: Embedded JavaScript templating for server-rendered views.
- **Socket.IO**: Real-time bidirectional event-based communication library.
- **Nodemailer**: Node.js module for sending emails.

## Setup and Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/event-management-system.git
    cd event-management-system
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Environment Variables**:
    Create a `.env` file in the project root directory and add the necessary environment variables. Refer to the `.envExample.txt` file for the required variables.

4. **Run the application**:
    ```sh
    npm start
    ```

5. **Access the application**:
    Open your browser and navigate to `http://localhost:3000`.

## File Structure

```
/event-management-system
│
├── controllers/
│   ├── event_controller.js
│   ├── payment_controller.js
│   └── user_controller.js
│
├── middleware/
│   ├── checkAuth.js
│   └── globalErrorHandler.js
│
├── models/
│   ├── chatHistory_model.js
│   ├── event_model.js
│   ├── ticket_model.js
│   └── user_model.js
│
├── routes/
│   ├── auth_route.js
│   ├── event_route.js
│   ├── payment_route.js
│   └── static_route.js
│
├── utils/
│   ├── asyncErrorHandler.js
│   ├── customErrorHandler.js
│   ├── liveChat.js
│   └── sendEmail.js
│
├── public/
│   ├── assets/
│   ├── css/
│   └── script/
│
├── views/
│   ├── authentication.ejs
│   ├── create_event.ejs
│   ├── event_card.ejs
│   ├── forgot_password.ejs
│   ├── homepage.ejs
│   ├── index.ejs
│   ├── my_event.ejs
│   ├── page404.ejs
│   ├── payment_success.ejs
│   ├── reset_password.ejs
│   ├── browse_event.ejs
│   └── ticket_card.ejs
│
├── .envExample.txt
├── .gitignore
├── README.md
├── app.js
└── server.js
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Connect with Me

Feel free to connect with me on LinkedIn:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue)](https://www.linkedin.com/in/anshulrajput237)
