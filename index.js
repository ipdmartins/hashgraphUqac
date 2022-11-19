const {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
  TransferTransaction,
} = require("@hashgraph/sdk");
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
  console.log(await transferFunds());
  console.log(await checkBalance("user1", user1AccountId, user1Client));
  console.log(await checkBalance("user2", user2AccountId, user2Client));
}

run();
