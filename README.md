"To be honest I feel like it'd be easier to rewrite the entire frontend from scratch and build it up and just integrate with the backend than to clean up the frontend as is now" - Me, 2 months ago.
And I have no regrets. 

(Just for clarification, I refers to Linas, the person behind the rewrite project, not the actual owner of this repository, and it will refer to Linas for the entire readme.)

The primary purpose of the entire project is to allow for an easy way for the NIFA Flying Sooners team to practice their aircraft recognition quizzes. They happen every year and it's important to actually get the answers right. And while sure, practicing on paper is nice and all, it's way better to just do it online. Which is why this exists. 
The secondary purpose of the project is a more personal one, I took this as an opportunity to learn a lot of new stuff. As you can tell from the code, I'm by no means anyone other than a complete beginner, but this project has taught me a lot.

# Instructions:
If you already know webdev stuff, it's simple. Run the npm server with `npm start` after installing the dependencies and you're good. Launch the code through whatever means you want and enjoy.
However, I know many people are not. So here is a detailed, step by step guide:

# 1. Install NodeJS
NodeJS is an addon to JavaScript that allows you to do cool things, such as work with databases. I chose it because it was simple and beginner friendly, and had plenty of tutorials made for it. 
To install it: 
- Go to https://https://nodejs.org
- Download the installer
- Run it
- Restart your computer
- Check if NodeJS is there by opening up command prompt by searching up `cmd` in Windows Search (Or whichever OS you use) and typing in `npm v`. If it returns with a version, you're good and feel free to proceed to step 2

# 2. Starting the server
The server is done with express and requires no real user action apart from two very easy commands.
But first, download the files from this GitHub repository, specifically the Rework branch. To do that:
- Go to the repository's rework branch
- Click the green code button
- On the popup menu that appears, click on the Download ZIP button. This may take some time depending on your internet speed.

Then, once that is complete:
- Open the zip and extract the contents to a drive or folder of your choosing. Could even put it on the desktop if you want.
- Open up the NIFA-Rework folder
- Right click anywhere inside except for the files
- In the menu that pops up, click "Open in terminal"dev
- Type in the following command: ```npm install``` and press enter.
- After all of that is done, type ing ```npm start```. You should see the line "Server is running on port 1337" at the very end. If this is the case, the server is now running. Feel free to proceed to step 3.

# 3. Launching the website
This one comes in two versions. It all depends on whether or not you have VSCode (or any other IDE) installed. And if you don't know what that is, you more than likely don't have it installed.
If you don't:
- Simply open up the PrimaryPage.html file found in the quiz folder and navigate the website.

If you do:
For VSCode users, it's very simple:
- Download the Live Server extension
- Click "Go Live" in the bottom right

If you use another IDE, you might have to do some digging around as to how to run it on your IDE.

# 4. Using the website
It is very self explanatory, however, here's a general tutorial:
- Learn page: Self explanatory. You simply learn the aircraft identification. You can easily navigate through the vast amount of aircraft with the previous and next buttons, and if you come back from a previous session, feel free to use the return to previous aircraft button to, as the name implies, return to the previous aircraft!
- Practice page: This is where you can test your skills in a quicker paced environment and none of the limitations of the testing page.
- Test page: This is where you actually get to test your skills. You only see the aircraft for three seconds and have to ID it from those three seconds alone.

Tag selection can be done in the primary page. This limits the aircraft pool to exclusively the ones you want to work with and nothing else. Perfect for when you struggle with a particular category.

Enjoy!
