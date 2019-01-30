// node-tweet-stream is a node module which provides events on new tweets
const Twitter = require('node-tweet-stream');
const tw = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  token: '',
  token_secret: ''
});

// ws is a node module to use websocket on server
const WebSocket = require('ws')

// Ask node-tweet-stream to provide an event whenever somebody tweets about javascript
tw.track('javascript');

// Create a websocket server
const wss = new WebSocket.Server({ port: 8080 })

// handle new connection request
wss.on('connection', ws => {
  // handle when client sends messages to server
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })

  let timer;
  clearTimeout(timer);
  timer = setTimeout(_ => {
    // callback for when there is a new tweet about our tracked topic
    tw.on('tweet', tweet => {
      console.log(tweet.text);
      // send message event to client with tweet text
      ws.send(tweet.text);
    });
  }, 2000);

});
