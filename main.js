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

const inputBtn = document.getElementById("inputBtn");
const selBtn = document.getElementById("selBank");
const maxmin = document.getElementById("maxmin");
const banks = [
  {
    name: "Privat",
    precents: 10,
    maxCredit: 500000,
    minPay: 35000,
  },
  {
    name: "Alfa",
    precents: 14.3,
    maxCredit: 350000,
    minPay: 20000,
  },
  {
    name: "Credo",
    precents: 17,
    maxCredit: 200000,
    minPay: 10000,
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
          <div><span>Min Down Payment </span>${bank.minPay}<span>$</span></div>
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
}
function chahgeB(bank) {
  inputName.value = [bank[0].name];
  inputPrecents.value = [bank[0].precents];
  inputMaxCredit.value = [bank[0].maxCredit];
  inputMinPay.value = [bank[0].minPay];
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
  if (
    formName == "" ||
    formPrecents == "" ||
    formMaxCredit == "" ||
    formMinDownPayment == ""
  ) {
    alert("Аill in the field");
  } else {
    const newBank = {
      name: formName,
      precents: formPrecents,
      maxCredit: formMaxCredit,
      minPay: formMinDownPayment,
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
  maxCal.innerHTML += banks[opt].maxCredit;
  minCal.innerHTML += banks[opt].minPay;
  return opt;
}


// let result = selBan();
res.addEventListener("click", (event) => {
  event.preventDefault();
  const startCredit = document.getElementById("startCredit").value;
  const firstPayment = document.getElementById("firstPayment").value;
  selBan();
  let select = selBan(banks);
  console.log(banks[select].precents + Number(startCredit));
});
// M - щомісячний платіж
// P - сума позики
// r - річна процентна ставка
// n - кількість щомісячних платежів
let m = 0,
  p = 20000,
  r = 10,
  n = 12;

m = p * (r / 12) * (1 + r / 12) ** n / ((1 + r / 12) ** n) - 1;
console.log(m);
