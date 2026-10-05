(function () {
  "use strict";

  // ----- Elements -----
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const questionText = document.getElementById("questionText");
  const counterValue = document.getElementById("counterValue");
  const btnPlus = document.getElementById("btnPlus");
  const btnMinus = document.getElementById("btnMinus");
  const btnRefresh = document.getElementById("btnRefresh");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("loginForm");

  // ----- Human verification: two random numbers (0-9), new on every refresh -----
  let answer = 0;

  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    answer = num1 + num2;
    questionText.textContent = `${num1} + ${num2} = ?`;
  }

  generateQuestion();

  // ----- Counter state -----
  let counter = 0;
  const MIN = 0;
  const MAX = 18; // highest possible sum of two single digits

  function renderCounter() {
    counterValue.textContent = counter;
    counterValue.classList.toggle("correct", counter === answer);
    btnMinus.disabled = counter <= MIN;
    btnPlus.disabled = counter >= MAX;
  }

  btnPlus.addEventListener("click", function () {
    if (counter < MAX) {
      counter++;
      renderCounter();
      updateSubmitState();
    }
  });

  btnMinus.addEventListener("click", function () {
    if (counter > MIN) {
      counter--;
      renderCounter();
      updateSubmitState();
    }
  });

  // ----- Refresh: new question + reset counter (no page reload) -----
  btnRefresh.addEventListener("click", function () {
    generateQuestion();
    counter = 0;
    renderCounter();
    updateSubmitState();
  });

  // ----- Password visibility toggle -----
  togglePassword.addEventListener("click", function () {
    const hidden = passwordInput.type === "password";
    passwordInput.type = hidden ? "text" : "password";
    togglePassword.setAttribute("aria-label", hidden ? "Hide password" : "Show password");
  });

  // ----- Submit gating: enabled only when fields filled AND counter === answer -----
  function allFieldsFilled() {
    return usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "";
  }

  function updateSubmitState() {
    submitBtn.disabled = !(allFieldsFilled() && counter === answer);
  }

  usernameInput.addEventListener("input", updateSubmitState);
  passwordInput.addEventListener("input", updateSubmitState);

  // ----- Submit handling -----
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitBtn.disabled) return;

    submitBtn.classList.add("success");
    submitBtn.querySelector("span").textContent = "Verified — Signing In…";

    setTimeout(function () {
      submitBtn.classList.remove("success");
      submitBtn.querySelector("span").textContent = "Submit";
    }, 2000);
  });

  // Initial paint
  renderCounter();
  updateSubmitState();
})();
