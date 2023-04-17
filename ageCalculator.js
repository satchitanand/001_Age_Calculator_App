function calculateAge(birthDate) {
  const currentDate = new Date();
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    const daysInLastFullMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    days += daysInLastFullMonth;
  }

  return { years, months, days };
}


function resetResults() {
  document.getElementById("years").innerText = "--";
  document.getElementById("months").innerText = "--";
  document.getElementById("days").innerText = "--";
}

function showError(element, messageElement) {
  element.classList.add("input-error");
  messageElement.style.visibility = "visible";
  
  resetResults();
}

function hideError(element, messageElement) {
  element.classList.remove("input-error");
  messageElement.style.visibility = "hidden";
  
  resetResults();
}

function validateInput() {
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const dayError = document.getElementById("day-error");
  const monthError = document.getElementById("month-error");
  const yearError = document.getElementById("year-error");

  let isValid = true;

  if (day.value === "" || day.value < 1 || day.value > 31) {
    showError(day, dayError);
    isValid = false;
  } else {
    hideError(day, dayError);
  }

  if (month.value === "" || month.value < 1 || month.value > 12) {
    showError(month, monthError);
    isValid = false;
  } else {
    hideError(month, monthError);
  }

  const currentYear = new Date().getFullYear();
  if (year.value === "" || year.value < 0 || year.value > currentYear) {
    showError(year, yearError);
    isValid = false;
  } else {
    hideError(year, yearError);
  }

  if (isValid) {
    const currentDate = new Date();
    const inputDate = new Date(year.value, month.value - 1, day.value);
    
    if (inputDate > currentDate) {
      showError(day, dayError);
      showError(month, monthError);
      showError(year, yearError);
      
      resetResults();
      isValid = false;
    }
  }

  return isValid;
}


document.getElementById("calc-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);

  if (validateInput(day, month, year)) {
    const birthDate = new Date(year, month - 1, day);
    const { years, months, days } = calculateAge(birthDate);

    document.getElementById("years").innerText = years;
    document.getElementById("months").innerText = months;
    document.getElementById("days").innerText = days;
  }
});
