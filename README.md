# DrawIt!

By: [Oliver Chen](https://github.com/oliverzzzzaaa) , 
[Yinqian Zheng](https://github.com/yinqianzheng) ,
[Johnson Wai](https://github.com/KCSJW) and 
[Guanyao Wang](https://github.com/guw005) ,


-------------------

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
  + AWS S3 (for images)
  + HTML Canvas
  + Heroku
  + Bootstrap 
  
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
      
      ![alt text](https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/drawing.gif "Gameplay")
      
  + Draw your own profile picture!

      We reused the paper.js and html canvas to allow users to draw their own profile picture. It is a small but fun
      feature we decided to include so everyone can see your "great" drawing. We currently store the image as base64 data
      in JavaScript, and convert it back on the front end to save space. 
      
      ![alt text](https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/profile.gif "Draw Your Own Profile Picture")

  + Future Addition of Games:
    
      We decided to refactor our code to allow for other games in our lobby and Create Game. We plan on including
      a few other games, and having our website and lobby host and handle these games. This allows our platform to 
      evolve and leaves space for future expansion.
      
      To handle server actions for multiple games, we created a function to dispatch the action to the appropriate handler
      based on the game.
      
      ```
      function handleGameAction(socket, lobby, payload) {
        let handler;
        switch (payload.game) {
          case "Pictionary":
          handler = pictionaryHandler[payload.type];
          break;
        default:
          break;  
        }
        handler(socket, lobby, payload.params);
      }
      ```
      
      To handle a game action, we just have to include the game name, action type, and the action data.
      
      ```
      handleGameAction(socket, lobby, {
        game: <Game Name>,
        type: <Action Type>,
        params: <Action Parameters>
      });
      ```
      
  + Handling Player Disconnect and Reconnect:
  
      Every time users disconnect from the server and they are a player in an ongoing game, they are kept 
      in the game room. Upon reconnecting, users are placed back into the game room, allowing them to continue playing.
      However, disconnected users are removed from the room if they do not reconnect before the game ends. 
      In addition if only one player is left in the room, the last remaining player will have the option to leave the room.|
      Once all the players have left, the room will be closed, removing everyone from the room.

      Spectators are simply removed from the room upon disconnection.
      
      ```
      leaveRoom(userId) {
      const roomId = this.map.get(userId);
      const room = this.rooms.get(roomId);
      if (room.remove(userId)) {
        this.map.delete(userId);
      }
      const hasPlayer = room.hasConnectedPlayer();
      if (!hasPlayer) {
        this.rooms.delete(roomId);
      }
      return { id: roomId, isEmpty: !hasPlayer };
      }

      ```
      
      
      
-------------------

