const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const password_confirm = document.getElementById("password_confirm");

function showError(input, message) {
  const formSection = input.parentElement;
  formSection.className = "form-section error";
  const small = formSection.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formSection = input.parentElement;
  formSection.className = "form-section success";
}

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

function getFieldName(input) {
  return input.id;
}

function isRequired(inputArr) {
  let required = false;
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required!`);
      required = true;
    } else {
      showSuccess(input);
    }
  });
  console.log(required);
  return required;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(password1, password2) {
  if ((password1.value === password2.value) !== "") {
    showSuccess(password2);
  } else {
    showError(password2, `${getFieldName(password1)} is not matched!`);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!isRequired([username, email, password, password_confirm])) {
    checkLength(username, 3, 15);
    checkEmail(email);
    checkLength(password, 6, 20);
    checkPasswordMatch(password, password_confirm);
  }
});
