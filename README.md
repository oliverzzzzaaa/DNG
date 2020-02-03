# DrawIt!

DrawIt is our take on the popular party game, Pictionary!

DrawIt is a game that requires at least 3 players, ideally four or more. Each round, there is one drawer who has to draw a chosen word. Other users have to guess the words based on the drawing, and type the word into the chat box. Correct guesses yield one point for both the guesser and the drawer. It's a simple but fun party game, since there are varying levels of difficulty and drawing skill!

-------------------

[DrawIt!](https://pictionary4.herokuapp.com/)


Technologies Used:
  + MongoDB
  + Express.js
  + React.js
  + Node.js
  + Socket.io
  + Paper.js
  + AWS S3
  + HTML Canvas
  + Heroku
  
  We used the MERN stack (MongoDB as database, Express for routing, React.js for front-end, Node.js for back-end). 
  Also used were Paper.js and HTML Canvas for drawings, Bootstrap for some buttons and carousels, 
  and Socket.io for websocket connections.
  Our site is hosted on Heroku.
  
-------------------

## **Some Features:**

  + Live Drawing: 
      
      When the drawer draws on the canvas, each mouse-down is emitted to the server, and then sent to every subscribed
      socket in the matching game room. 
      
      We had a fun time learning how to integrate HTML Canvas, Paper.js (to track mouse movements) and Socket.io
      to emit and receive each user's actions. In addition, resizing some pre-built libraries reqiured a little more
      investigating. 
  + Live Score and Chat Updates:
  
      When a message is submitted to the chat, the server has to check if the messages matches the target word.
      If it does, the word is censored so other players can't see the correct guesses as they appear. Once a correct
      guess is made, the scores must be updated on the server, and reflected on the scoreboard for each user. We chose
      to have the front-end handle the censoring of correct guesses, since the front-end already stores the correct guess
      for the drawer. The back-end only checks if it is a correct guess, and if scores need to be incremeneted. 
  + Future Addition of Games:
    
      We decided to refactor our code to allow for other games in our lobby and Create Game. We plan on including
      a few other games, and having our website and lobby host and handle these games. This allows our platform to 
      evolve and leaves space for future expansion.
      
      
-------------------

## ***Code Snippets:***




Screenshot: 


Features to Add:
  + AWS S3 for saved images
  + Adding additional games to our lobby

