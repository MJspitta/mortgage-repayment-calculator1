const formCalculator = document.getElementById('calculator-section');
const mortgageAmount = document.getElementById('mortgage-amount');
const mortgageTerm = document.getElementById('mortgage-term');
const interestRate = document.getElementById('interest-rate');

const emptyElement = document.querySelector('.empty-results-display');
const completeElement = document.querySelector('.complete-results-display');
const monthlyRepayment = document.querySelector('.monthly-repay-result');
const totalRepayment = document.querySelector('.total-repay-result');


const checkFormValidity = () => {
  let isValid = true;

  const mortgageA = parseFloat(mortgageAmount.value);
  if (!mortgageA) {
    mortgageAmount.closest('.mortgage-amount').querySelector('.input-container')?.style.setProperty('border-color', 'hsl(4, 69%, 50%)');
    mortgageAmount.closest('.mortgage-amount').querySelector('.input-container span')?.style.setProperty('background', 'hsl(4, 69%, 50%)');
    mortgageAmount.closest('.mortgage-amount').querySelector('.input-container span')?.style.setProperty('color', 'white');
    mortgageAmount.closest('.mortgage-amount').querySelector('.error').style.display = 'block';
    isValid = false;
  } else {
    mortgageAmount.closest('.mortgage-amount').querySelector('.input-container')?.style.removeProperty('border-color');
    mortgageAmount.closest('.mortgage-amount').querySelector('.input-container span')?.style.removeProperty('background');
    mortgageAmount.closest('.mortgage-amount').querySelector('.input-container span')?.style.removeProperty('color');
    mortgageAmount.closest('.mortgage-amount').querySelector('.error').style.display = 'none';
  }

  const mortgageT = parseFloat(mortgageTerm.value);
  if (!mortgageT) {
    mortgageTerm.closest('.mortgage-term').querySelector('.input-container')?.style.setProperty('border-color', 'hsl(4, 69%, 50%)');
    mortgageTerm.closest('.mortgage-term').querySelector('.input-container span')?.style.setProperty('background', 'hsl(4, 69%, 50%)');
    mortgageTerm.closest('.mortgage-term').querySelector('.input-container span')?.style.setProperty('color', 'white');
    mortgageTerm.closest('.mortgage-term').querySelector('.error').style.display = 'block';
    isValid = false;
  } else {
    mortgageTerm.closest('.mortgage-term').querySelector('.input-container')?.style.removeProperty('border-color');
    mortgageTerm.closest('.mortgage-term').querySelector('.input-container span')?.style.removeProperty('background');
    mortgageTerm.closest('.mortgage-term').querySelector('.input-container span')?.style.removeProperty('color');
    mortgageTerm.closest('.mortgage-term').querySelector('.error').style.display = 'none';
  }

  const interestR = parseFloat(interestRate.value);
  if (!interestR) {
    interestRate.closest('.interest-rate').querySelector('.input-container')?.style.setProperty('border-color', 'hsl(4, 69%, 50%)');
    interestRate.closest('.interest-rate').querySelector('.input-container span')?.style.setProperty('background', 'hsl(4, 69%, 50%)');
    interestRate.closest('.interest-rate').querySelector('.input-container span')?.style.setProperty('color', 'white');
    interestRate.closest('.interest-rate').querySelector('.error').style.display = 'block';
    isValid = false;
  } else {
    interestRate.closest('.interest-rate').querySelector('.input-container')?.style.removeProperty('border-color');
    interestRate.closest('.interest-rate').querySelector('.input-container span')?.style.removeProperty('background');
    interestRate.closest('.interest-rate').querySelector('.input-container span')?.style.removeProperty('color');
    interestRate.closest('.interest-rate').querySelector('.error').style.display = 'none';
  }

  const selected = document.querySelector('input[name="mortgage-type"]:checked');
  const mortgageType = document.querySelector('.mortgage-type');
  if (!selected) {
    mortgageType.querySelector('.error').style.display = 'block';
    isValid = false;
  } else {
    mortgageType.querySelector('.error').style.display = 'none';
  }

  return isValid;
};

const handleRepayment = (principal, rate, years) => {
  const monthlyRate = (rate / 100) / 12;
  const noOfMonths = years * 12;

  const monthlyPayment = principal * ((monthlyRate * Math.pow(1 + monthlyRate, noOfMonths)) / (Math.pow(1 + monthlyRate, noOfMonths) - 1));

  return monthlyPayment;
};

const handleInterestOnly = (principal, rate) => {
  const monthlyRate = (rate / 100) / 12;
  const monthlyPayment = principal * monthlyRate;

  // const totalInterest = monthlyPayment * noOfMonths;

  return monthlyPayment;
};

console.log(handleRepayment(300000, 5.25, 25))

formCalculator.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!checkFormValidity()) return;

  const principal = parseFloat(mortgageAmount.value);
  const years = parseFloat(mortgageTerm.value);
  const rate = parseFloat(interestRate.value);
  const type = document.querySelector('input[name="mortgageType"]:checked')?.value;

  const monthly = type === 'repayment' ? handleRepayment(principal, rate, years) : handleInterestOnly(principal, rate);

  const totalPayment = type === 'repayment' ? monthly * years * 12 : monthly * years * 12 + (type === 'interest-only' ? principal : 0);

  monthlyRepayment.innerHTML = `&#163;${monthly.toFixed(2)}`;
  totalRepayment.innerHTML = `&#163;${totalPayment.toFixed(2)}`;
  emptyElement.style.display = 'none';
  completeElement.style.display = 'block';

})