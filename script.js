const form = document.querySelector('.pod__form');
const emailInput = document.querySelector('.pod__input');
const errorMessage = document.querySelector('.pod__error-message');

let debounceTimer;

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add('pod__error-message--visible');

  if (window.innerWidth < 768) {
    // MOBILE → nur Input rot
    emailInput.classList.add('pod__input--error');
    form.classList.remove('pod__form--error');
  } else {
    // TABLET/DESKTOP → ganze Form rot
    form.classList.add('pod__form--error');
    emailInput.classList.remove('pod__input--error'); // optional
  }
}

function hideError() {
  errorMessage.classList.remove('pod__error-message--visible');
  emailInput.classList.remove('pod__input--error');
  form.classList.remove('pod__form--error');
}

// Debounce Live Check ✓
emailInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const value = emailInput.value.trim();

    if (value === '') {
      hideError();
      return;
    }

    if (isValidEmail(value)) {
      hideError();
    } else {
      showError("Oops! Please check your email");
    }
  }, 2000);
});

// Submit Check ✓
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = emailInput.value.trim();

  if (value === '') {
    showError("Oops! Please add your email");
    return;
  }

  if (!isValidEmail(value)) {
    showError("Oops! Please check your email");
    return;
  }

  hideError();
  form.reset();
});