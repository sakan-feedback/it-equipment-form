const form = document.getElementById("equipmentForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    employee_name: document.getElementById("employee_name").value,
    employee_id: document.getElementById("employee_id").value,
    location: document.getElementById("location").value,
    department: document.getElementById("department").value,
    device_type: document.getElementById("device_type").value,
    brand_model: document.getElementById("brand_model").value,
    sim_phone: document.getElementById("sim_phone").value,
    remarks: document.getElementById("remarks").value
  };

  try {
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      successMessage.innerHTML = "Data Submitted Successfully";
      successMessage.style.color = "green";
      form.reset();
    } else {
      successMessage.innerHTML = "Submission Failed";
      successMessage.style.color = "red";
    }
  } catch (error) {
    successMessage.innerHTML = "Connection Error";
    successMessage.style.color = "red";
  }
});
