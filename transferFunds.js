const { Hbar, TransferTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

const frameworkAnalyzer = require("./transactionAnalizer");
var txconfirmedcount = 0;
var sumTxInputTxComfirmed = 0;

async function transferFunds(
  user1AccountId,
  user2AccountId,
  user1Client,
  numberOfTransactions
) {
  //get the transaction beginning in millisec for analyzeTPS
  const milibefore = Date.now();

  var status;
  for (let index = 0; index < numberOfTransactions; index++) {
    //it's for analyzeARD
    var txInput = Date.now();

    //Create the transfer transaction
    const sendHbar = await new TransferTransaction()
      .addHbarTransfer(user1AccountId, Hbar.fromTinybars(-169))
      .addHbarTransfer(user2AccountId, Hbar.fromTinybars(169))
      .execute(user1Client);

    //Verify the transaction reached consensus
    const transactionReceipt = await sendHbar.getReceipt(user1Client);

    status = transactionReceipt.status.toString();

    //if transaction is done, txConfirmed add 1
    if (status == "SUCCESS") {
      //getting consensus timestamp on blockchain in seconds for analyzeARD
      var txConfirmed = Date.now();

      //it's for analyzeARD
      sumTxInputTxComfirmed += txConfirmed - txInput;

      txconfirmedcount++;
    } else {
      console.log(`transaction ${index + 1} failed.`);
    }
  }
  //get the transaction's end in millicsec for analyzeTPS
  const miliafter = Date.now();

  const TPS = frameworkAnalyzer.analyzeTPS(
    txconfirmedcount,
    milibefore,
    miliafter
  );

  const ARD = frameworkAnalyzer.analyzeARD(
    sumTxInputTxComfirmed,
    txconfirmedcount
  );

  const resp = {
    status: `The transfer from my account to the new account was: ${status.toString()}`,
    tps: `Transactions per second (txs/s): ${TPS.TPS}`,
    ard: `Average Response Delay in seconds (txs/s): ${ARD.ARD}`,
  };

  return resp;
}

module.exports.transferFunds = transferFunds;
