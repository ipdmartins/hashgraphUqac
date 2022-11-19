const { Client } = require("@hashgraph/sdk");
require("dotenv").config();

const user1AccountId = process.env.USER_1_ID;
const user1PrivateKey = process.env.USER_1_PRIVATE_KEY;
const user2AccountId = process.env.USER_2_ID;
const user2PrivateKey = process.env.USER_2_PRIVATEKEY;

if (user1AccountId == null || user1PrivateKey == null) {
  throw new Error(
    "Environment variables user1AccountId and user1PrivateKey must be present"
  );
}

if (user2AccountId == null || user2PrivateKey == null) {
  throw new Error(
    "Environment variables user2AccountId and user2PrivateKey must be present"
  );
}

const user1Client = Client.forTestnet();
user1Client.setOperator(user1AccountId, user1PrivateKey);

const user2Client = Client.forTestnet();
user2Client.setOperator(user2AccountId, user2PrivateKey);

module.exports = { user1Client, user1AccountId, user2Client, user2AccountId };
