const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const {
  user1Client,
  user1AccountId,
  user2AccountId,
  user2Client,
} = require("./accountSet");
const SendMessage = require("./sendMessage");
const TransferFunds = require("./transferFunds");

const message1 = "L";
const message10 = "Lorem ipsu";
const message100 =
  "Lorem ipsum egestas lorem aliquam sapien, vivamus taciti innunc Lorem ipsum egestas lorem aliquam se";
const numberOfThreads = 1;
const numberOfTransactions = 1;
const typeTransaction = "transferFunds";
// const typeTransaction = "sendMessage";

if (isMainThread) {
  for (let x = 1; x <= numberOfThreads; x++) {
    const idThread = 100 + x;
    const worker = new Worker(__filename, {
      workerData: {
        numberOfTransactions,
        byteSize: 1,
        idThread,
        numberOfThreads,
      },
    });
    worker.once("message", function () {
      console.log("Thread worker id: " + worker.threadId + " finished");
    });
    worker.on("error", console.error);
    console.log("Iniciando worker id: " + worker.threadId);
  }
} else {
  if (!workerData) return;
  executor();
}

async function executor() {
  const numberOfTransactions = workerData.numberOfTransactions;
  const byteSize = workerData.byteSize;
  const idThread = workerData.idThread;
  const nroThreads = workerData.numberOfThreads;

  if (typeTransaction === "transferFunds") {
    const transfer = new TransferFunds();
    transfer.transferFunds(
      user1AccountId,
      user2AccountId,
      user1Client,
      user2Client,
      numberOfTransactions,
      idThread,
      nroThreads
    );
  } else {
    const messager = new SendMessage();
    if (byteSize === 1) {
      messager.getTopicId(
        user1Client,
        message1,
        numberOfTransactions,
        byteSize,
        nroThreads
      );
    }
    if (byteSize === 10) {
      messager.getTopicId(
        user1Client,
        message10,
        numberOfTransactions,
        byteSize,
        nroThreads
      );
    }
    if (byteSize === 100) {
      messager.getTopicId(
        user1Client,
        message100,
        numberOfTransactions,
        byteSize,
        nroThreads
      );
    }
  }

  parentPort.postMessage("Concluded");
}

//https://hedera.com/explorers
//https://app.dragonglass.me/hedera/home
//https://www.speedtest.net/
