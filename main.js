const allBank = document.getElementById("all_banks");
const activeAdd = document.getElementById("inputBtn");
const saveNewBank = document.getElementById("saveNewBank");
const cancelNewBank = document.getElementById("cancelNewBank");
// btn
const addBanks = document.getElementById("add");
const chahgeBanks = document.getElementById("chahge");
const removeBanks = document.getElementById("remove");
// input
const form = document.forms.formBank;

const inputName = document.getElementById("inputName");
const inputPrecents = document.getElementById("inputPrecent");
const inputMaxCredit = document.getElementById("inputMax");
const inputMinPay = document.getElementById("inputMin");
const inputTerm = document.getElementById("inputTerm");

const inputBtn = document.getElementById("inputBtn");
const selBtn = document.getElementById("selBank");
const maxmin = document.getElementById("maxmin");
const banks = [
  {
    name: "Privat",
    precents: 10,
    maxCredit: 500000,
    minPay: 5,
    term: 12,
  },
  {
    name: "Alfa",
    precents: 14.3,
    maxCredit: 350000,
    minPay: 20,
    term: 10,
  },
  {
    name: "Credo",
    precents: 17,
    maxCredit: 200000,
    minPay: 10,
    term: 18,
  },
];

let bankToBeModified = null;

renderBanks(banks);
function renderBanks(banks) {
  allBank.innerHTML = "";
  banks.map((bank) => {
    const bankBtn = `
       <button id="btn_bank" data-name="${bank.name}" class="bank btn_bank">
           <div>${bank.name}</div>
          <div>${bank.precents}<span>%</span></div>
        </button>
        <div class="max_min">
          <div><span>Max Credit </span>${bank.maxCredit}<span>$</span></div>
          <div><span>Min Down Payment </span>${bank.minPay}<span>%</span></div>
          <div><span>Term: </span>${bank.term}</div>
        </div>
    `;
    allBank.innerHTML += bankBtn;
  });
}
// button

function inputClean() {
  inputName.value = "";
  inputPrecents.value = "";
  inputMaxCredit.value = "";
  inputMinPay.value = "";
  inputTerm.value = "";
}
function chahgeB(bank) {
  inputName.value = [bank[0].name];
  inputPrecents.value = [bank[0].precents];
  inputMaxCredit.value = [bank[0].maxCredit];
  inputMinPay.value = [bank[0].minPay];
  inputTerm.value = [bank[0].term];
}
function addBank(bank) {
  banks.push(bank);
  renderBanks(banks);
}
addBanks.addEventListener("click", () => {
  activeAdd.classList.add("active");
});
chahgeBanks.addEventListener("click", (event) => {
  event.preventDefault();
  const bankEl = document.querySelectorAll(".bank");
  for (let i = 0; i < bankEl.length; i += 1) {
    const el = bankEl[i];
    activeAdd.classList.add("active");
    if (el.classList.contains("active")) {
      el.classList.remove("active");
    }
    if (!el.classList.contains("active_fix")) {
      el.classList.add("active_fix");
    } else {
      el.classList.remove("active_fix");
    }
    if (el.classList.contains("active_fix")) {
      el.addEventListener("click", () => {
        if (el.classList.contains("active_fix")) {
          bankToBeModified = banks.slice(i);
          banks.splice(i, 1);
          renderBanks(banks);
          chahgeB(bankToBeModified);
        }
      });
    }
  }
});

removeBanks.addEventListener("click", (event) => {
  event.preventDefault();
  const bankEl = document.querySelectorAll(".bank");
  for (let i = 0; i < bankEl.length; i += 1) {
    const el = bankEl[i];
    console.log(el);
    if (el.classList.contains("active_fix")) {
      el.classList.remove("active_fix");
    }
    if (!el.classList.contains("active")) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
    if (el.classList.contains("active")) {
      el.addEventListener("click", () => {
        if (el.classList.contains("active")) {
          banks.splice(i, 1);
          renderBanks(banks);
        }
      });
    }
  }
});

saveNewBank.addEventListener("click", (event) => {
  event.preventDefault();

  const formI = new FormData(form);

  const formName = formI.get("name");
  const formPrecents = formI.get("precents");
  const formMaxCredit = formI.get("maxCredit");
  const formMinDownPayment = formI.get("minDownPayment");
  const formTerm = formI.get("term");
  if (
    formName == "" ||
    formPrecents == "" ||
    formMaxCredit == "" ||
    formMinDownPayment == "" ||
    formTerm == ""
  ) {
    alert("Аill in the field");
  } else {
    const newBank = {
      name: formName,
      precents: formPrecents,
      maxCredit: formMaxCredit,
      minPay: formMinDownPayment,
      term: formTerm,
    };

    addBank(newBank);
    inputClean();
    renderInput(banks);
  }
});

cancelNewBank.addEventListener("click", (event) => {
  event.preventDefault();
  activeAdd.classList.remove("active");
  if (bankToBeModified !== null) {
    addBank(bankToBeModified[0]);
  }
  renderBanks(banks);
});

const dropDown = document.getElementById("drop_down");
const minCal = document.getElementById("min");
const maxCal = document.getElementById("max");
const term = document.getElementById("term");

const resultAm = document.getElementById("result_amount");

const res = document.getElementById("res");

renderInput(banks);
selBan(banks);
function renderInput(banks) {
  dropDown.innerHTML = "";
  for (const bank of banks) {
    const dropD = `
     <option value="${bank.precents}">${bank.name} ${
      bank.precents
    }${"%"}</option>
    `;
    dropDown.innerHTML += dropD;
  }
}
function selBan() {
  let sel = document.getElementById("drop_down").selectedIndex;
  let banksAll = document.getElementById("drop_down").options;
  let opt = banksAll.selectedIndex;
  maxCal.innerHTML = " Max Credit: " + banks[opt].maxCredit;
  minCal.innerHTML = "Min Down Payment: " + banks[opt].minPay + "%";
  term.innerHTML = "Term: " + banks[opt].term;
  return opt;
}

res.addEventListener("click", (event) => {
  event.preventDefault();
  let select = selBan(banks);
  let result = 0;
  const startCredit = document.getElementById("startCredit").value;
  const firstPayment = document.getElementById("firstPayment").value;
  const credit = Number(startCredit);
  const first = Number(firstPayment);
  const start = credit - first;
  const max = banks[select].maxCredit;
  const min = banks[select].minPay;
  const term = banks[select].term;
  const proc = banks[select].precents;
  const minProc = (credit / 100) * min;

  if (start > max) {
    alert("The credit exceeds the maximum credit of the selected bank");
  } else if (first < minProc) {
    alert(
      `Down payment of the selected bank ${min}% that is at least $${minProc}`
    );
  } else if (first > start) {
    alert("The down payment may not exceed the loan amount");
  } else {
    result = (start + (((start / 100) * proc) / 12) * term) / term;
    resultAm.innerHTML = "$" + result.toFixed(2);
  }
});
