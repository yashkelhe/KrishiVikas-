// Focus on Empty Input fields
function focusEmptyFields() {
  const inputElements = [
    document.getElementById("nitrogen-crop-input"),
    document.getElementById("temp-crop-input"),
    document.getElementById("phosphorous-crop-input"),
    document.getElementById("humidity-crop-input"),
    document.getElementById("potassium-crop-input"),
    document.getElementById("ph-crop-input"),
    document.getElementById("rainfall-crop-input"),
  ];

  for (let i = 0; i < inputElements.length; i++) {
    if (inputElements[i].value === "") {
      inputElements[i].focus();
      return 0;
    }
  }

  return 1;
}

const CROP_ENDPOINT =
  "https://8080-797137136eb6451193a1f8c64a951490.onpatr.cloud/crop_recommend";

const crop_value_ranges = {
  nitrogen: [0, 150],
  phosphorous: [5, 145],
  potassium: [5, 205],
  temperature: [0, 50],
  humidity: [1, 100],
  ph: [3, 10],
  rainfall: [20, 300],
};

function handleClick() {
  const isFieldEmpty = focusEmptyFields();
  if (isFieldEmpty == 0) {
    console.log("Some Inputs are empty !");
    return;
  }

  const nitrogenValue = document.getElementById("nitrogen-crop-input").value;
  const tempValue = document.getElementById("temp-crop-input").value;
  const phosphorousValue = document.getElementById(
    "phosphorous-crop-input"
  ).value;
  const humidityValue = document.getElementById("humidity-crop-input").value;
  const potassiumValue = document.getElementById("potassium-crop-input").value;
  const phValue = document.getElementById("ph-crop-input").value;
  const rainfallValue = document.getElementById("rainfall-crop-input").value;

  const min_temp = crop_value_ranges.temperature[0];
  const max_temp = crop_value_ranges.temperature[1];
  const min_humid = crop_value_ranges.humidity[0];
  const max_humid = crop_value_ranges.humidity[1];

  if (tempValue < min_temp || tempValue > max_temp) {
    alert("Temperature must be between 0-50 Celsius!");
    return;
  } else if (humidityValue < min_humid || humidityValue > max_humid) {
    alert("Humidity must be between 1-100!");
    return;
  }

  const progressBar = document.querySelector(".crop-progress-bar");
  progressBar.style.display = "block";
  progressBar.style.visibility = "visible";

  const data = {
    array: [
      nitrogenValue,
      phosphorousValue,
      potassiumValue,
      tempValue,
      humidityValue,
      phValue,
      rainfallValue,
    ],
  };

  fetch(CROP_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // Handle navigation or state update here
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Some Error Occurred, Try again.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const predictButton = document.querySelector(".predict_crop_btn");
  predictButton.addEventListener("click", handleClick);
});

document.getElementById("hamburger").addEventListener("click", function () {
  var navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("show");
});
