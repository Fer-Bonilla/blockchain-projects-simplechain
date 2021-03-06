/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');

const Block = require('./block')
const levelSandbox = require('./dataLayer')

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain{

  constructor(){
    this.db = levelSandbox;
    }

  // Add new block
  async addBlock(newBlock){
    try {
      if(newBlock.height >= 0){
        this.db.addLevelDBData(newBlock.height, JSON.stringify(newBlock)).then(() => { });
      }
    } catch(err) {
      console.log(err)
    }    
  }

  addBlock(newBlock){
    return new Promise((resolve, reject) => {
        this.db.getChainHeightData().then(chainLength => {
          if(newBlock.height >= 0 &&  newBlock.height > chainLength){
            this.db.addLevelDBData(newBlock.height, JSON.stringify(newBlock)).then(() => { });
          }
        }).then({    }).then(saveOperationResult => {
            console.log("block saved");
            resolve(saveOperationResult);
        }).catch(err => {
            reject(new Error(`${err.message}`));
        });
    });
}


  // Get block height
  getBlockHeight(){

    try {

      levelSandbox.getChainHeightData()
      .then(height => {
        return height;
      });

    } catch(err) {
      console.log(err)
    }    
  }

  // get block
  getBlock(blockHeight){
      // return object as a single string

      try {
        this.db.getLevelDBData(blockHeight).then((value) => {
          return JSON.parse(value)
        });
      } catch(err) {
        console.log(err)
      }        
      
    }

}

module.exports = Blockchain;