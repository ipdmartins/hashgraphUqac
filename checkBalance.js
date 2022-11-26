const { AccountBalanceQuery } = require("@hashgraph/sdk");
require("dotenv").config();

//Verify the account balance
async function checkBalance(user, accountId, client) {
  const accountBalance = await new AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client);

  const currentUSer = user === "user1" ? "User 1" : "User 2";

  return `${currentUSer} new balance: ${accountBalance.hbars.toTinybars()} tinybar.`;
}

module.exports = { checkBalance };
