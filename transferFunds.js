const { Hbar, TransferTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

const frameworkAnalyzer = require("./transactionAnalizer");
const { checkBalance } = require("./checkBalance");
var txconfirmedcount = 0;
var sumTxInputTxComfirmed = 0;

const fs = require("fs");
const { error } = require("console");

module.exports = class TransferFunds {
  constructor() {
    this.path = "/home/ipdmartins/Documents/hederaUqac/";
  }

  async transferFunds(
    user1AccountId,
    user2AccountId,
    user1Client,
    user2Client,
    numberOfTransactions,
    idThread,
    nroThreads
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

      //getting consensus timestamp on blockchain in seconds for analyzeARD
      var txConfirmed = Date.now();

      //Verify the transaction reached consensus
      const transactionReceipt = await sendHbar.getReceipt(user1Client);

      status = transactionReceipt.status.toString();

      //if transaction is done, txConfirmed add 1
      if (status == "SUCCESS") {
        //it's for analyzeARD
        sumTxInputTxComfirmed += txConfirmed - txInput;

        txconfirmedcount++;
      } else {
        throw new error(`transaction ${index + 1} failed.`);
      }
    }
    //get the transaction's end in millicsec for analyzeTPS
    const miliafter = Date.now();

    const TPS = frameworkAnalyzer.analyzeTPS(
      txconfirmedcount,
      milibefore,
      miliafter
    );
    console.log("Transactions per second (txs/s): ", TPS);

    const ARD = frameworkAnalyzer.analyzeARD(
      sumTxInputTxComfirmed,
      txconfirmedcount
    );
    console.log("Average Response Delay in seconds (txs/s): ", ARD);

    const user1 = await checkBalance("user1", user1AccountId, user1Client);
    const user2 = await checkBalance("user2", user2AccountId, user2Client);

    let one = TPS.TPS.toString();
    one = one.replace(".", ",");
    let two = ARD.ARD.toString();
    two = two.replace(".", ",");

    const result = `ThreadID:${idThread} TPS:${one} ARD:${two}\n${user1}\n${user2}\n`;

    fs.appendFile(
      this.path +
        "TransferFunds_" +
        nroThreads +
        "_nroThreads_" +
        numberOfTransactions +
        "_lots.txt",
      result,
      (err) => {
        if (err) throw err;
      }
    );
  }
};
