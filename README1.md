Ad Campaign Tracker

A simple full-stack application for creating, viewing, and managing advertising campaigns.
Built using Node.js + Express (Backend) and HTML/CSS/JavaScript (Frontend) with MongoDB as the database.


---

✨ Features

Add new ad campaigns with details such as title, budget, start–end dates, etc.

Display all campaigns in a clean UI.

Store campaigns in MongoDB using Mongoose.

REST API for creating and fetching campaigns.

Simple, lightweight frontend in vanilla HTML, CSS, and JavaScript.



---

🛠️ Technologies Used

Frontend:

HTML5

CSS3

JavaScript


Backend:

Node.js

Express.js

Mongoose (MongoDB ODM)


Database:

MongoDB (Cloud or Local)



---

🚀 How to Execute / Run This Project

1. Clone the Repository

git clone https://github.com/Khushi6659/ad-campaign-tracker.git
cd ad-campaign-tracker

2. Install Dependencies

npm install

3. Setup Environment Variables

Create a file named .env in the root folder.

Add the following:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Example (for local MongoDB):

MONGO_URI=mongodb://127.0.0.1:27017/ad_campaigns

4. Start the Server

npm start

If nodemon is configured, you can also use:

npm run dev

5. Open the App in a Browser

http://localhost:5000

Your frontend will load, and any campaign you add will be saved to the MongoDB database.


---

📁 Project Structure

ad-campaign-tracker/
│
├── models/            # MongoDB schema (Campaign model)
├── public/            # Frontend files (HTML, CSS, JS)
├── server.js          # Main Express server
├── package.json
├── .env               # Environment config (not included in repo)
└── README.md


---

📌 Future Enhancements

Edit and delete campaigns

Dashboard with charts (spend, impressions, conversions)

User login and authentication

Responsive UI

Sorting and filtering campaigns
