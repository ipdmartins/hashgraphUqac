const {
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  TopicInfoQuery,
} = require("@hashgraph/sdk");
const transactionAnalizer = require("./transactionAnalizer");
const fs = require("fs");
const { error } = require("console");

module.exports = class SendMessage {
  constructor() {
    this.path = "/home/ipdmartins/Documents/hederaUqac/";
  }

  async getTopicId(user1Client, message, numberOfTransactions, bytes) {
    // create topic
    const topicTransaction = await new TopicCreateTransaction().execute(
      user1Client
    );
    //Grab the newly generated topic ID
    let receipt = await topicTransaction.getReceipt(user1Client);
    let topicId = receipt.topicId;

    this.submitTransaction(
      user1Client,
      message,
      numberOfTransactions,
      topicId,
      bytes
    );
  }

  async submitTransaction(
    user1Client,
    message,
    numberOfTransactions,
    topicId,
    bytes
  ) {
    var sumTxInputTxComfirmed = 0;
    var txconfirmedcount = 0;
    //get the transaction beginning in millisec for analyzeTPS
    const milibefore = Date.now();

    for (let index = 0; index < numberOfTransactions; index++) {
      //it's for analyzeARD
      var txInput = Date.now();
      // send one message
      const sendResponse = await new TopicMessageSubmitTransaction({
        topicId: topicId,
        message: message,
      }).execute(user1Client);

      //getting consensus timestamp on blockchain in seconds for analyzeARD
      var txConfirmed = Date.now();
      const sendReceipt = await sendResponse.getReceipt(user1Client);
      const status = sendReceipt.status.toString();

      //if transaction is done, txConfirmed add 1
      if (status === "SUCCESS") {
        //it's for analyzeARD
        sumTxInputTxComfirmed += txConfirmed - txInput;
        txconfirmedcount++;
      } else {
        throw new error(`transaction ${index + 1} failed.`);
      }
    }
    const miliafter = Date.now();

    const TPS = transactionAnalizer.analyzeTPS(
      txconfirmedcount,
      milibefore,
      miliafter
    );
    console.log("Transactions per second (txs/s): ", TPS);

    const ARD = transactionAnalizer.analyzeARD(
      sumTxInputTxComfirmed,
      txconfirmedcount
    );
    console.log("Average Response Delay in seconds (txs/s): ", ARD);

    let one = TPS.TPS.toString();
    one = one.replace(".", ",");
    let two = ARD.ARD.toString();
    two = two.replace(".", ",");

    const result = `topicId:${topicId} TPS:${one} ARD:${two}\n`;

    fs.appendFile(
      this.path +
        "SendMessage_" +
        bytes +
        "_bytes_" +
        numberOfTransactions +
        "_lots.txt",
      result,
      (err) => {
        if (err) throw err;
      }
    );
  }

  async log(topicId, user1Client, bytes) {
    //Create the account info query
    const query = new TopicInfoQuery().setTopicId(topicId);

    //Submit the query to a Hedera network
    const info = await query.execute(user1Client);

    //Print the account key to the console

    console.log("Transação de " + bytes + "byte, com topicId: " + topicId);
    console.log(info.expirationTime);
  }
};
