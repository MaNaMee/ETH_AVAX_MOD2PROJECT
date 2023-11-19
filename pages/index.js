import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const [transferToAddress, setTransferToAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;


  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };


  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };


  const handleTransferToAddressChange = (e) => {
    setTransferToAddress(e.target.value);
  };
  
  const handleTransferAmountChange = (e) => {
    setTransferAmount(e.target.value);
  };
  
  // Event handler for the first button click
  const handleButton1Click = async() => {
    if (atm) {
      var withint = parseInt(inputValue1, 10);
      let tx = await atm.withdraw(inputValue1);
      await tx.wait();
      getBalance();
      setTransacCountcust("Withdraw", "-" + inputValue1);
    }
  };

  // Event handler for the second button click
  const handleButton2Click = async() => {
    if (atm) {
      var depoint = parseInt(inputValue2, 10);
      let tx = await atm.deposit(depoint);
      await tx.wait()
      getBalance();
      setTransacCountcust("Deposit", "+" + inputValue2);
    }};

  const handleTransfer = async () => {
      if (atm && transferToAddress && transferAmount) {
        let tx = await atm.transfer(transferToAddress, parseInt(transferAmount, 10));
        await tx.wait();
        console.log("Transfer Successful!");
        getBalance();
        setTransacCountcust("Transfer", "-" + transferAmount);
      }
    };
  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      console.log(account)
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
      setTransacCount("Deposit", "+1");
    }
  }

  const withdraw = async() => {
    if (atm) {
      console.log(account)
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
      setTransacCount("Withdraw", "-1");
    }
  }

  const setTransacCount = (status, amount) => {
    const counter = transactionCount;

    const transaction = [amount, status];
    const transacHistoryTemp = transactionHistory;
    transacHistoryTemp.push(transaction);
    setTransactionHistory(transacHistoryTemp);

    const transacCount = transactionCount + 1;
    setTransactionCount(transacCount);
  };

  const setTransacCountcust = (status, amount) => {
    const counter = transactionCount;

    const amt = parseInt(amount); 
    const transaction = [amount, status];
    const transacHistoryTemp = transactionHistory;
    transacHistoryTemp.push(transaction);
    setTransactionHistory(transacHistoryTemp);

    const transacCount = transactionCount + amt;
    setTransactionCount(transacCount);
  };

  const showTransactionHistory = () => {
    if (transactionHistory.length === 0) {
      return <p>No transaction history available this session.</p>;
    } else {
      return (
        <div>
        <h2>Transaction History</h2>
        {transactionHistory.map((transaction, index) => (
          <div key={index}>
            <p>Transaction: {transaction[1]}</p>
            <p>Value: {transaction[0]} ETH</p>
            <br />
          </div>
        ))}
      </div>
      );
    }
  };



  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
       
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>

        <form >
        {/* First input field with an onChange event handler */}
        <input
          type="text"
          value={inputValue1}
          onChange={handleInputChange1}
          placeholder="Enter number to withdraw"
        />
        <button type="button" onClick={handleButton1Click}>
          Withdraw ETH
        </button>
        {/* Second input field with an onChange event handler */}
        <input
          type="text"
          value={inputValue2}
          onChange={handleInputChange2}
          placeholder="Enter number to deposit"
        />
        {/* Two buttons with onClick event handlers */}
        <button type="button" onClick={handleButton2Click}>
          Deposit ETH
        </button>
      </form>
        <div>
        <label>Transfer ETH:</label>
          <input
            type="text"
            value={transferToAddress}
            onChange={handleTransferToAddressChange}
            placeholder="Enter recipient address"
          />
          <input
            type="text"
            value={transferAmount}
            onChange={handleTransferAmountChange}
            placeholder="Enter amount to transfer"
          />
          <button type="button" onClick={handleTransfer}>
            Transfer
          </button>
        </div>
        {showTransactionHistory()}
    </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
