const {
  user1AccountId,
  user1Client,
  user2AccountId,
  user2Client,
} = require("./accountSet");
const { checkBalance } = require("./checkBalance");
const { transferFunds } = require("./transferFunds");
require("dotenv").config();

async function run() {
  const numberOfTransactions = 1;

  console.log(
    await transferFunds(
      user1AccountId,
      user2AccountId,
      user1Client,
      numberOfTransactions
    )
  );
  console.log(await checkBalance("user1", user1AccountId, user1Client));
  console.log(await checkBalance("user2", user2AccountId, user2Client));
}

run();
