<!-- @format -->

# Title: SMSVote

# Description:

SMSVote is an open source application that enables votes to be cast by SMS. It uses Firebase for the backend, SignalWire for SMS, and Vue.js for the front end. A Firebase cloud function ‘castVote’ , is triggered by a SignalWire ‘LaML’ web hook, when an SMS is received. A Cloud Firestore database is updated with each vote, and the ‘Vote.vue’ component listens for these updates. Candidates are represented by an avatar and UI element, which increase in size with each vote, so the UI updates in real time.

# How to use:

To use the application, simply text the number associated with the candidate you wish to vote for, to the phone number on the page. There’s no sign-up, restrictions on how many times you can vote, or deadline, though these are things you may wish to consider in your own version of this project. Click ‘reset’ to restart the vote.

**Video Demo:**

https://firebasestorage.googleapis.com/v0/b/textvote-7a52e.appspot.com/o/SMS%20Vote%20Sceen%20Recording.mp4?alt=media&token=f2316b95-cce9-4e41-96ba-fbb006820143

**Demo Site:**

https://jbmj7k-5173.preview.csb.app/

**Sandbox:**

https://codesandbox.io/p/github/markokoh/SMSVote/main?file=%2Ffunctions%2Findex.js

If you wish to fork this project and make your own version, you will need Firebase and SignalWire accounts:

https://signalwire.com/

https://firebase.google.com/

The avatars are from here:

https://blush.design/

The code is made available through a GNU LGPLv3 license.

Mark Okoh
