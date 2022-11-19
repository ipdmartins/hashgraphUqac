module.exports = {
  //Transactions Per Second
  analyzeTPS(txconfirmedcount, milibefore, miliafter) {
    /*TPS = During a period of time from ti to tj , Transactions Per Second 
    of peer we abbreviate transaction as Tx.*/
    if (milibefore != 0 && miliafter != 0) {
      const startTimeSeconds = milibefore / 1000;
      const endTimeSeconds = miliafter / 1000;
      var TPS = txconfirmedcount / (endTimeSeconds - startTimeSeconds);
    }
    return {
      TPS: TPS,
    };
  },

  //Average Response Delay
  analyzeARD(sumTxInputTxComfirmed, txconfirmedcount) {
    /*ARD: During a period of time from ti to tj, the action of each transaction
		firstly sent to the peer is marked as Txinput and the action when Tx is 
    confirmed is marked as Txconfirmed (sumTxInputTxComfirmed). Number of 
    transactions confirmed is txconfirmedcount*/
    var ARD = sumTxInputTxComfirmed / 1000 / txconfirmedcount;
    return {
      ARD: ARD,
    };
  },
};
