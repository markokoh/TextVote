/** @format */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const {FieldValue} = require("firebase-admin/firestore");

const candidates = ["Mark", "Joan", "Steve"];

const addVote = async (candidate) => {
  try {
    const candidateRef = db.collection("elections").doc("exampleVote");
    await candidateRef.update({
      [candidate]: FieldValue.increment(1),
    });
  } catch (err) {
    console.log("Error adding vote: ", err);
  }
};

// 'PARSEFLOAT' TO CONVERT STRING (MESSAGE) TO NUMBER.
const checkVoteValue = (message) => {
  const vote = parseFloat(message);

  // CHECK IF VOTE IS VALID
  if (isNaN(vote) || vote < 1 || vote > candidates.length) {
    console.log("Invalid vote - no vote cast");
    return;
  }

  // ADD VOTE TO CANDIDATE ACCORDING TO VOTE (MESSAGE) RECEIVED
  const candidate = candidates[vote - 1];
  console.log("Vote cast for", candidate);
  addVote(candidate);
};

// 'CASTVOTE' CLOUD FUNCTION IS CALLED VIA A SIGNALWIRE
// WEBHOOK, WHEN AN SMS IS RECEIVED ON THE NUMBER IT IS ASSOCIATED WITH.
// INFO HERE: https://developer.signalwire.com/guides/how-to-configure-your-webhook/

exports.castVote = functions.https.onRequest((req, res) => {
  const messageBody = req.body.Body;
  checkVoteValue(messageBody);
  res.end();
});
