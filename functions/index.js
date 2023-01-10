/** @format */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const {FieldValue} = require("firebase-admin/firestore");

const candidates = ["Mark", "Joan", "Steve"];

const addVote = async (candidate) => {
  const candidateRef = db.collection("elections").doc("exampleVote");

  await candidateRef.update({
    [candidate]: FieldValue.increment(1),
  });
};

// TEXT MESSAGES ARE STRINGS
// USING 'PARSEFLOAT' TO CONVERT STRINGS (NUMBERS) TO NUMBER
const checkVoteValue = (message) => {
  const vote = parseFloat(message);

  // IF MESSAGE IS A NUMBER, BUT HIGHER THAN THE NUMBER OF CANDIDATES,
  // A VOTE IS NOT CAST
  if (candidates.length < vote) {
    console.log("Value is greater than number of candidates. No vote cast");
    return;
  }

  // IF MESSAGE IS NOT A NUMBER, A VOTE IS NOT CAST
  if (isNaN(vote)) {
    console.log("Value is not a number - no vote cast");
    return;
  }

  candidates.forEach((element, index) => {
    if (vote - 1 === index) {
      console.log("Vote cast for", element);
      addVote(element);
    }
  });
};

exports.castVote = functions.https.onRequest((req, res) => {
  const messageBody = req.body.Body;
  checkVoteValue(messageBody);
  res.end();
});
