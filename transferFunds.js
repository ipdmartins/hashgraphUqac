const {
  AccountBalanceQuery,
  Hbar,
  TransferTransaction,
} = require("@hashgraph/sdk");
require("dotenv").config();
const { user1Client, user1AccountId, user2AccountId } = require("./accountSet");

async function transferFunds() {
  //Create the transfer transaction
  const sendHbar = await new TransferTransaction()
    .addHbarTransfer(user1AccountId, Hbar.fromTinybars(-169))
    .addHbarTransfer(user2AccountId, Hbar.fromTinybars(169))
    .execute(user1Client);

  //Verify the transaction reached consensus
  const transactionReceipt = await sendHbar.getReceipt(user1Client);

  //Request the cost of the query
  const queryCost = await new AccountBalanceQuery()
    .setAccountId(user1AccountId)
    .getCost(user1Client);

  const resp = {
    status: `The transfer from my account to the new account was: ${transactionReceipt.status.toString()}`,
    cost: `The cost of query is: ${queryCost}`,
  };

  return resp;
}

module.exports.transferFunds = transferFunds;
