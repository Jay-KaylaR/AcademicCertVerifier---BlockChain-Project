// Minimal client to call verifyCertificate.
// Set contractAddress after deployment.
const contractAddress = "REPLACE_WITH_DEPLOYED_ADDRESS";
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"certId","type":"string"},{"internalType":"string","name":"studentName","type":"string"},{"internalType":"string","name":"courseName","type":"string"},{"internalType":"string","name":"institution","type":"string"}],"name":"issueCertificate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"certId","type":"string"}],"name":"revokeCertificate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"certId","type":"string"}],"name":"verifyCertificate","outputs":[{"internalType":"string","name":"studentName","type":"string"},{"internalType":"string","name":"courseName","type":"string"},{"internalType":"string","name":"institution","type":"string"},{"internalType":"uint256","name":"issuedOn","type":"uint256"},{"internalType":"bool","name":"isValid","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

async function init() {
  if (typeof window.ethereum === 'undefined') {
    document.getElementById('result').innerText = 'MetaMask or compatible wallet is required.';
    return;
  }
  window.web3 = new Web3(window.ethereum);
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (e) {
    document.getElementById('result').innerText = 'Wallet access denied.';
    return;
  }
  window.contract = new web3.eth.Contract(abi, contractAddress);
  document.getElementById('verifyBtn').addEventListener('click', verify);
}

async function verify() {
  const id = document.getElementById('certId').value.trim();
  if (!id) return;
  try {
    const res = await window.contract.methods.verifyCertificate(id).call();
    const out = {
      studentName: res[0],
      courseName: res[1],
      institution: res[2],
      issuedOn: new Date(res[3]*1000).toISOString(),
      isValid: res[4]
    };
    document.getElementById('result').innerText = JSON.stringify(out, null, 2);
  } catch (e) {
    document.getElementById('result').innerText = 'Error: ' + e.message;
  }
}

window.addEventListener('load', init);
