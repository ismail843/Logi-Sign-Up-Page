// ✅ Get references to all elements from the page
const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

// ✅ Listen for form submission
form.addEventListener('submit', (e) => {
  let errors = []; // Store all error messages

  // 👉 If the firstname field exists → it's a Signup page
  if (firstname_input) {
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    // 👉 Otherwise → it's a Login page
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  // ❌ If we find any errors, stop form submission
  if (errors.length > 0) {
    e.preventDefault(); // prevent page reload
    error_message.innerText = errors.join('. '); // show all error messages together
  }
});

// ✅ Function to validate Signup form
function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  // 🔹 Check if name is empty
  if (firstname === '' || firstname == null) {
    errors.push('Firstname is required');
    firstname_input.parentElement.classList.add('incorrect');
  }

  // 🔹 Check if email is empty
  if (email === '' || email == null) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }

  // 🔹 Check if password is empty
  if (password === '' || password == null) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }

  // 🔹 Check if password has at least 8 characters
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters');
    password_input.parentElement.classList.add('incorrect');
  }

  // 🔹 Check if repeat password matches
  if (password !== repeatPassword) {
    errors.push('Passwords do not match');
    password_input.parentElement.classList.add('incorrect');
    repeat_password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

// ✅ Function to validate Login form
function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === '' || email == null) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }

  if (password === '' || password == null) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

// ✅ Listen for input events on every field to remove error styles dynamically
const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(
  (input) => input != null
);

// When the user starts typing, remove the error style & clear the message
allInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  });
});
