**COSC2634 – Building IT Systems**

**User Manual**

**Mentor**: Nguyen Phuc Hoang Thien

**Group**: 12

**Name**:

Pham Vo Dong – s3891968

Tran Ngoc Khang – s3927201

Pham Anh Thu – s3878246

# **Installation:**

## **Localhost:**

**Note:** You must install the code editor in your device (e.g., Visual Studio Code (VSCode)).

**Step 1:** Access this URL: <https://github.com/anhthu106/rmit-hub>, click on “Code” button and choose “Download ZIP”
to download the source code.

**Step 2:** Unzip the folder and open the code in code editor (VSCode).

# **Set-up procedure:**

**Step 1:** Open the downloaded folder in VSCode and run npm install in terminal

**Step 2:** Open the .env file and config

**Step 3:** Run npm run dev or yarn dev to run the server

**Step 4:** The default port is 3000, so head to <http://localhost:3000> to start using the website

**Note:** If you want to use your own database you must have course and major data which is include in the zip folder.

# **Getting started:**

## **Routes:**

- http://localhost:3000: the landing page or the homepage (when user has already logged in)
- http://localhost:3000/signup: the signup page
- http://localhost:3000/signin: the login page
- http://localhost:3000/recover: the recover page
- http://localhost:3000/user/[id]: the profile page of user
- http://localhost:3000/team: the page containing all teams
- http://localhost:3000/team/[id]:  the working space of each team (when user has joined the team) or the general
  information of the team (when user has not joined the team)
- http://localhost:3000/team/[id]/Management: the page containing general information of the team. As for team owner,
  there are additional functions such as View Pending List (Accept Request/ Delete Request), Edit Team and Delete Team
- Sample account:
- Username: <s3891968@rmit.edu.vn>    Password: Rmithub123
- Username: <s3927201@rmit.edu.vn>    Password: Rmithub123
- Username: <s3878246@rmit.edu.vn>    Password: Rmithub123

## ` `**How to access the RMIT-HUB application**

Open any internet browser (Google Chrome, Firefox, Brave, and so on) and access the following
URL <http://localhost:3000>.

## **View website general information:**

Users can find out our application detail and our team introduction at the landing page when they access to application
at the first time or when they log out their accounts.

## **Register an account:**

**Note:** If you have not created an account yet, you can go the sign-up page.
**Step 1:** Click on the sign-up button on the navigation bar
**Step 2:** Fill out all information at the sign-up form
**Note:** You must follow the constraint of our application

- The email must be the student RMIT email. However, we use the post tab that contains “@rmit.edu.vn” so user only needs
  to enter their student ID which starts with letter “s” and 7 numbers following.
- Password is minimum eight characters, at least one uppercase letter, one lowercase letter and one number.

**Step 3:** Click on the register button and we will send you the email for confirmation

**Note:** The email is valid within 5 minutes.

**Step 4:** Check your email, find our mail, and click on “VERIFY YOUR EMAIL” button to complete the register process

*Figure 8: Email confirmation*

## **Login**

- After completing all the steps in register process, you will be redirected to the login page.
- If you already have the account, you can click on the login button in the header
  *Figure 9: Login button*

- To login your account, enter your email and password and click the “Sign in” button

*Figure 10: Login*

## **Recover your password**

- If you forgot your password, you are allowed reset the password by following these steps:

**Step 1:** Click on the “Forgot password”

**Step 2:** After clicking the link, you will be redirected to the forgot password page to enter the email

**Step 3:**  After submitting the recover form, please check your email and find our recover email.

Click on the “RECOVER
YOUR PASSWORD” button and you will be redirected to the “Enter New Password” page.

**Step 4:** Enter new password and click on “Reset Password” button

## **View and modify your profile**

If you want to update
your personal information such as username, campus, major and avatar, following the bellow steps:

**Step 1:** Click on “My Account” at the “User” dropdown on the navigation bar

*Figure 15: My Account button*

**Step 2:** All your basic information will be displayed on “My Account” page. On this page, click on the “Edit” button
on the left side of the page and the “Edit Profile” box will appear

**Step 3:** After filling out the field that you want to update, click on the “Update” button

## **View all posts:**

- On the homepage, you will see all the post created by all users. The post will be displayed based on
  the date, and the post that is closest to the current date will be displayed first.

- You can edit or delete your post by hovering the hamburger in your post and there are two options “Edit Post” and
  “Delete Post”:

**Note:** You can only see the hamburger on your post.

- ### **Edit profile:**

**Step 1:**  Click on the “Edit Post” button.

**Step 2:** Change the post content or the post image and click on the “Update Post” button. Your post
is successfully updated.

*Figure 20: Edit post box*

- ### **Delete post**

After hovering the hamburger, click on the “Delete Post” button and the post will be deleted

## **Create posts**

**Note:** You can only create the post when you are in team. If you do not have team, please go to Category 9 (View all
team and create team).

**Step 1:** Click on the status box on the homepage or on My Account page .

**Step 2:** After “Create Post” box appears, you must fill all the field including team, content, and image. The course
field will be automatically updated when you update the team field. Then, click on the “Create Post” button. If you do
not want to create post, click on the “Cancel” button.

## **View all team and create team**

- You can view all the teams, or you can create your own team.
- ### **View all teams**:

**Step 1:** Click on team button on the navigation bar

**Step 2:** View all the teams

- ### **Create team**

**Step 1:** Click on the “Create your team now” button , and the “Create New Team” box will appear (See
figure 28).

**Step 2:** Fill out all
information and click on “Create Team” button

*Figure 28: Create team box*

## **View team information and modify team information**

- You can view the information of the team that you join in.

**Step 1:** Go to “My Account” page and click on the team on the “Teams” site . Then, you will be
redirected to the dashboard of the team.

**Step 2:** In the team dashboard page, click on the “Management” button to see your team information .

- If you are the owner of the team, you have additional activities such as view Pending List, Edit and Delete team

## **Join team**

- Users can send the request to join team, and the owner can be notified via email.
- **Request to join team (Team member):**
- **Step 1:** Go to the Team site and click on “View Team” button to see the team information

**Note:** A member can only join one team in one course.

## **Accept or reject the request (Team admin):**

- **Step 1:** When users request to join team, team owners will get notified via email , or they can
  check for the request on the pending list at the “Management” site

- **Step 2:** Click on the Accept or Reject button for each request

## **Collaborate with other team members using Kanban board:**

You and your team members may collaborate in real time on the Team site's Dashboard using a Kanban board.

**Step 1:** Go to the Team Dashboard to see the Kanban board

**Step 2:** Enter the title of list and click on “Add List” button to create list

If you want to delete the
list, hover the hamburger icon, and click on “Delete” button

**Step 3:** Click on the “Create Task” button and fill out all information such as Name, Description, Deadline, Person
In Charge

### **Edit Task:** You can edit the task

**Step 1:** Click on the
“Edit” button in the task you want to modify

**Step 2:** When the Edit box appears, modify the field that you want to update and click “Update” button

### **Delete Task:** You can delete the task by clicking on the “Delete” button

### **Move task:** You can move the task from list to list

**Step 1:** Hold on the task you want to move

**Step 2:** Drop this task

**Step 2:** Drop the task to the other list

# **Reference:**

React-select (no date) npm. Available
at: [https://www.npmjs.com/package/react-select](https://www.npmjs.com/package/react-select%20) (Accessed: January

6, 2023).

React-dom (no date) npm. Available
at: [https://www.npmjs.com/package/react-dom](https://www.npmjs.com/package/react-dom%20) (Accessed: January 6,

2023).

React-beautiful-DND (no date) npm. Available at: <https://www.npmjs.com/package/react-beautiful-dnd>

(Accessed: January 6, 2023).

React (no date) npm. Available at: [https://www.npmjs.com/package/react](https://www.npmjs.com/package/react%20) (
Accessed: January 6, 2023).

Nodemailer (no date) npm. Available at: <https://www.npmjs.com/package/nodemailer> (Accessed: January 6, 2023).

Next-Auth (no date) npm. Available
at: [https://www.npmjs.com/package/next-auth](https://www.npmjs.com/package/next-auth%20) (Accessed: January 6, 2023).

Next (no date) npm. Available at: [https://www.npmjs.com/package/next](https://www.npmjs.com/package/next%20) (Accessed:
January 6, 2023).

Mongoose (no date) npm. Available
at: [https://www.npmjs.com/package/mongoose](https://www.npmjs.com/package/mongoose%20) (Accessed: January 6, 2023).

Jsonwebtoken (no date) npm. Available
at: [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken%20) (Accessed: January 6,
2023).

HTTP-status-codes (no date) npm. Available
at: [https://www.npmjs.com/package/http-status-codes](https://www.npmjs.com/package/http-status-codes%20) (Accessed:
January 6, 2023).

Config (no date) npm. Available at: [https://www.npmjs.com/package/config](https://www.npmjs.com/package/config%20) (
Accessed: January 6, 2023).

(no date)

Flowbite.com. Available at: [https://flowbite.com/](https://flowbite.com/%20) (Accessed: January 6, 2023).

Flowbite react components (no date) Flowbite React Components. Available
at: [https://flowbite-react.com/](https://flowbite-react.com/%20) (Accessed: January 6, 2023).

Bcrypt (no date) npm. Available at: [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt%20) (
Accessed: January 6, 2023).

Image and video upload, storage, optimization and CDN (2023) Cloudinary. Available
at: [https://cloudinary.com/](https://cloudinary.com/%20) (Accessed: January 6, 2023).

Socket.io (no date) SocketIO RSS. Available at: [https://socket.io/](https://socket.io/%20) (Accessed: January 6, 2023).

Socket.io-client (no date) npm. Available
at: [https://www.npmjs.com/package/socket.io-client](https://www.npmjs.com/package/socket.io-client%20) (Accessed:
January 6, 2023).
17

