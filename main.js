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

renderBanks(banks);
function renderBanks(banks) {
  allBank.innerHTML = "";
  banks.map((bank) => {
    const bankBtn = `
       <button id="btn_bank" class="bank btn_bank">
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

// function selectBanks(banks) {
//   banks.map((bank) => {
//     const bankSel = `
//       <option width="320px" id="btn_bank" class="btn_bank footer_banks" value="">${bank.name} - Max Credit ${bank.maxCredit}, Min Down Payment ${bank.minPay} ${bank.precents}<span>%</span></option>

//     `;
//     selBtn.innerHTML += bankSel;
//   });
// }

// button
addBanks.addEventListener("click", () => {
  activeAdd.classList.add("active");
});
function inputClean() {
  inputName.value = "";
  inputPrecents.value = "";
  inputMaxCredit.value = "";
  inputMinPay.value = "";
}
function addBank(bank) {
  banks.push(bank);
  renderBanks(banks);
}

chahgeBanks.addEventListener("click", () => {});

removeBanks.addEventListener("click", (event) => {
  event.preventDefault();
  const bankEl = document.querySelectorAll(".bank");
  for (let i = 0; i < bankEl.length; i += 1) {
    const el = bankEl[i];
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
  console.log(formName);
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
  }
});

cancelNewBank.addEventListener("click", (event) => {
  event.preventDefault();
  activeAdd.classList.remove("active");
  renderBanks(banks);
});
