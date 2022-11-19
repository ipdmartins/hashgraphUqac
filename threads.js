const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const { myaccount, testerAccount } = require("./myaccount");
const frameworkAnalyzer = require("./frameworkAnalyzer");
const Topic = require("./topic");
const Filer = require("./filer");

const message1 = "L";
const message10 = "Lorem ipsu";
const message100 =
  "Lorem ipsum egestas lorem aliquam sapien, vivamus taciti innunc Lorem ipsum egestas lorem aliquam se";
const client = testerAccount.testClient;

if (isMainThread) {
  let id = 50;
  for (let x = 1; x <= 50; x++) {
    const worker = new Worker(__filename, {
      workerData: { num: 1, byte: 1, lote: id },
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
  const numberOfTransactions = workerData.num;
  const cond = workerData.byte;
  const lotes = workerData.lote;

  if (cond === 1) {
    // const topic = new Topic();
    // topic.getTopicId(client, message1, numberOfTransactions, frameworkAnalyzer, cond, lotes)

    const filer = new Filer();
    filer.fileCreator(numberOfTransactions, message1, cond, lotes);
  }

  if (cond === 10) {
    // const topic = new Topic();
    // topic.getTopicId(client, message10, numberOfTransactions, frameworkAnalyzer, cond, lotes)

    const filer = new Filer();
    filer.fileCreator(numberOfTransactions, message10, cond, lotes);
  }

  if (cond === 100) {
    // const topic = new Topic();
    // topic.getTopicId(client, message100, numberOfTransactions, frameworkAnalyzer, cond, lotes)

    const filer = new Filer();
    filer.fileCreator(numberOfTransactions, message100, cond, lotes);
  }

  parentPort.postMessage("Concluded");
}
