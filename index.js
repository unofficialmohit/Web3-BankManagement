import Web3 from "web3";

let account;
let contract;
let contractAddress = "0x07ADaC927176D18C16dabc5106230348395b792B";
let contractABI = [
  {
    inputs: [],
    name: "addLoanFund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "createAccount",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "month",
        type: "uint256",
      },
    ],
    name: "getCarLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "month",
        type: "uint256",
      },
    ],
    name: "getEducationLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "month",
        type: "uint256",
      },
    ],
    name: "getHomeLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "payCarEmi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "payEducationEmi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "payHomeEmi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "username",
        type: "address",
      },
    ],
    name: "transferMoney",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "money",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "money",
        type: "uint256",
      },
    ],
    name: "withdrawLoanFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "displayUserDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "UserID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "Accountbalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "HomeLoan",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "HomeEmiCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "HomeEmiLeft",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "CarLoan",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "CarEmiCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "CarEmiLeft",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EducationLoan",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EducationEmiCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EducationEmiLeft",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLoanFund",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAccounts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
let webjs;

let currentAddress = document.getElementById("currentAddress");
let addFundButton = document.getElementById("addFund");
let displayFundButton = document.getElementById("displayFund");
let createAccount = document.getElementById("createAccount");
let fundAmount = document.getElementById("fundAmount");
let depositAmount = document.getElementById("depositAmount");
let deposit = document.getElementById("deposit");
let withdrawAmount = document.getElementById("withdrawAmount");
let withdraw = document.getElementById("withdraw");
let balance = document.getElementById("balance");
let getLoanAmount = document.getElementById("getLoanAmount");
let getLoanType = document.getElementById("getLoanType");
let getLoan = document.getElementById("getLoan");
let getLoanPeriod = document.getElementById("getLoanPeriod");
let withdrawFundAmount = document.getElementById("withdrawFundAmount");
let withdrawFund = document.getElementById("withdrawFund");
let payLoanType = document.getElementById("payLoanType");
let payLoan = document.getElementById("payLoan");
let transferTo = document.getElementById("transferTo");
let transferAmount = document.getElementById("transferAmount");
let transfer = document.getElementById("transfer");
let displayDetails = document.getElementById("displayDetails");

ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
  account = accounts[0];
  currentAddress.innerHTML = account;
});

ethereum.on("accountsChanged", (accounts) => {
  account = accounts[0];
  currentAddress.innerHTML = account;
});

addFundButton.addEventListener("click", async () => {
  
	let flag=1;
	await contract.methods.addLoanFund().estimateGas({from:account , value: parseInt(fundAmount.value)})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}
		Current gas price is ${gasPrice}
		Total Gas Cost will be ${gasPrice*result};`)

	})
	.catch(error=>{
		flag=0;
		window.alert("TRANSACTION NOT COMPLETED. "+error);
		console.log(error);
	})
	if(flag==1)
	await contract.methods
    .addLoanFund()
    .send({ from: account, value: parseInt(fundAmount.value) })
    .catch((error) => {
      window.alert("ERROR" + error);
    });
});

displayFundButton.addEventListener("click", async () => {
	await contract.methods.getLoanFund().estimateGas({from:account})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
	})
	let result = await contract.methods.getLoanFund().call({ from: account });
	window.alert(result);
});

createAccount.addEventListener("click", async () => {
	let flag=1;
	await contract.methods.createAccount().estimateGas({from:account})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)

	})
	.catch(error=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
  	await contract.methods.createAccount().send({ from: account });
});

deposit.addEventListener("click", async () => {
	let flag=1;
	await contract.methods.deposit(parseInt(withdrawAmount.value)).estimateGas({from:account, value: parseInt(depositAmount.value) })
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)

	})
	.catch(error=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
	await contract.methods
    .deposit()
    .send({ from: account, value: parseInt(depositAmount.value) });
});
withdraw.addEventListener("click", async () => {
	let flag=1;
	await contract.methods.withdraw(parseInt(withdrawAmount.value)).estimateGas({from:account})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)

	})
	.catch(error=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
	await contract.methods
    .withdraw(parseInt(withdrawAmount.value))
    .send({ from: account });
});

balance.addEventListener("click", async () => {
  let result = await contract.methods.getBalance().call({ from: account });
  window.alert(result);
});

getLoan.addEventListener("click", async () => {
  let loanType = getLoanType.value;
  if (loanType == "car") {
	let flag=1;
	await contract.methods.getCarLoan(parseInt(getLoanAmount.value), parseInt(getLoanPeriod.value)).estimateGas({from:account})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)

	})
	.catch(error=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
    await contract.methods
      .getCarLoan(parseInt(getLoanAmount.value), parseInt(getLoanPeriod.value))
      .send({ from: account });
  } else if (loanType == "home") {
	let flag=1;
	await contract.methods.getHomeLoan(parseInt(getLoanAmount.value), parseInt(getLoanPeriod.value)).estimateGas({from:account})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)

	})
	.catch(error=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
    await contract.methods
      .getHomeLoan(parseInt(getLoanAmount.value), parseInt(getLoanPeriod.value))
      .send({ from: account });
  } else {
	let flag=1;
	await contract.methods.getEducationLoan(parseInt(getLoanAmount.value), parseInt(getLoanPeriod.value)).estimateGas({from:account})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)

	})
	.catch(error=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
    await contract.methods
      .getEducationLoan(
        parseInt(getLoanAmount.value),
        parseInt(getLoanPeriod.value)
      )
      .send({ from: account });
  }
});

withdrawFund.addEventListener("click", async () => {
	let flag=1;
	await contract.methods.withdrawLoanFund(parseInt(withdrawFundAmount.value)).estimateGas({from:account})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)

	})
	.catch(error=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
	await contract.methods
    .withdrawLoanFund(parseInt(withdrawFundAmount.value))
    .send({ from: account });
});

payLoan.addEventListener("click", async () => {
  if (payLoanType == "car") {
	let flag=1;
	await contract.methods.payCarEmi().estimateGas({from:account})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)

	})
	.catch(error=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
    await contract.methods.payCarEmi().send({ from: account });
  } else if (payLoanType == "home") {
	let flag=1;
	await contract.methods.payHomeEmi().estimateGas({from:account})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)

	})
	.catch(error=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
    await contract.methods.payHomeEmi().send({ from: account });
  } else {
	let flag=1;
	await contract.methods.payEducationEmi().estimateGas({from:account})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)

	})
	.catch(error=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
    await contract.methods.payEducationEmi().send({ from: account });
  }
});

transfer.addEventListener("click", async () => {
	let flag=1;
	await contract.methods.transferMoney(parseInt(transferAmount.value), transferTo.value).estimateGas({from:account})
	.then(async (result)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)

	})
	.catch(error=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
	await contract.methods
    .transferMoney(parseInt(transferAmount.value), transferTo.value)
    .send({ from: account });
});

displayDetails.addEventListener("click", async () => {
  let result = await contract.methods
    .displayUserDetails()
    .call({ from: account });
  console.log(result);
  console.log(result.Accountbalance);
  window.alert(`
	User ID : ${result.UserID}
	Account Balance : ${result.Accountbalance} 

	Car Emi Cost : ${result.CarEmiCost}
	Car Emi Left : ${result.CarEmiLeft}
	Car Loan : ${result.CarLoan}

	Home Emi Cost : ${result.HomeEmiCost}
	Home Emi Left : ${result.HomeEmiLeft}
	Home Loan : ${result.HomeLoan}

	Education Emi Cost : ${result.EducationEmiCost}
	Education Emi Left : ${result.EducationEmiLeft}
	Education Loan : ${result.EducationLoan}`);
});

function connectToContract() {
  webjs = new Web3(window.ethereum);
  contract = new webjs.eth.Contract(contractABI, contractAddress);
  console.log("Contract Instance Created");
  console.log(contract.options.address);
}
connectToContract();
