const {
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  TopicInfoQuery,
} = require("@hashgraph/sdk");
const si = require("systeminformation");
var process = require("process");
const fs = require("fs");

module.exports = class SendMessage {
  constructor() {
    this.path = "/home/ipdmartins/Documents/hederaUqac/";
  }

  async getTopicId(
    user1Client,
    message,
    numberOfTransactions,
    frameworkAnalyzer,
    bytes,
    lotes
  ) {
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
      frameworkAnalyzer,
      bytes,
      lotes
    );
  }

  async submitTransaction(
    user1Client,
    message,
    numberOfTransactions,
    topicId,
    frameworkAnalyzer,
    bytes,
    lotes
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
        console.log(`transaction ${index + 1} failed.`);
      }
    }
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

    ////////// LOGS /////////
    console.log(
      "Transactions confirmed from t(i) to t(j): " + txconfirmedcount
    );
    console.log("MilliTime before transaction: " + milibefore);
    console.log("MilliTime after transaction: " + miliafter);
    console.log(
      "Sum of time in t (before transaction) and t (after success) in miliseconds: " +
        sumTxInputTxComfirmed
    );

    console.log();
    ////////// LOGS /////////

    let one = TPS.TPS.toString();
    one = one.replace(".", ",");
    let two = ARD.ARD.toString();
    two = two.replace(".", ",");

    const result = `${one};${two};${six}\n`;

    fs.appendFile(
      this.path + bytes + "_bytes" + lotes + "_lotes.txt",
      result,
      (err) => {
        if (err) throw err;
      }
    );

    // var stream = fs.createWriteStream(`/home/ipdmartins/Hashgraph/file_${bytes}_bytes_ID_${topicId}.txt`);

    // stream.once('open', function (fd) {
    //     stream.write(`${one};`);
    //     stream.write(`${two};`);
    //     stream.write(`${three};`);
    //     stream.write(`${four};`);
    //     stream.write(`${five};`);
    //     stream.write(`${six}\n`);
    //     stream.end();
    // });

    this.log(topicId, myaccount, bytes);
  }

  async log(topicId, myaccount, bytes) {
    //Create the account info query
    const query = new TopicInfoQuery().setTopicId(topicId);

    //Submit the query to a Hedera network
    const info = await query.execute(myaccount);

    //Print the account key to the console

    console.log("Transação de " + bytes + " com topicId: " + topicId);
    console.log(info.expirationTime);
  }
};
