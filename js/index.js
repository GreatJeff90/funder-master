$(document).ready(function () {
  // Display "Vehicle Found" message when car registration number is entered
  $("#carreg").on("input", function () {
    let carReg = $(this).val();
    if (carReg) {
      $("#vehicleFound").removeClass("hidden");
    } else {
      $("#vehicleFound").addClass("hidden");
    }
  });

  $("#quoteForm").submit(function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    let fullName = $("#fullname").val();
    let gender = $("#gender").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let dob = new Date($("#dob").val());
    let postalCode = $("#postalcode").val();
    let carReg = $("#carreg").val();
    let duration = $("#duration").val();
    let startDate = $("#startdate").val();

    // Calculate age and determine insurance price
    let age = calculateAge(dob);
    let insurancePrice = calculateInsurancePrice(age);

    // Show modal with quote
    $("#quoteModal").modal("show");
    $("#quoteResult").html(`
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Date of Birth:</strong> ${dob.toLocaleDateString()}</p>
      <p><strong>Postal Code:</strong> ${postalCode}</p>
      <p><strong>Car Registration Number:</strong> ${carReg}</p>
      <p><strong>Insurance Duration:</strong> ${duration} months</p>
      <p><strong>Start Date:</strong> ${new Date(
        startDate
      ).toLocaleDateString()}</p>
      <p><strong>Insurance Price:</strong> €${insurancePrice}</p>
    `);

    // Prepare downloadable quote as PDF
    let { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    doc.text("Ezygo Insurance Quote", 10, 10);
    doc.text(`Full Name: ${fullName}`, 10, 20);
    doc.text(`Gender: ${gender}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text(`Phone: ${phone}`, 10, 50);
    doc.text(`Date of Birth: ${dob.toLocaleDateString()}`, 10, 60);
    doc.text(`Postal Code: ${postalCode}`, 10, 70);
    doc.text(`Car Registration Number: ${carReg}`, 10, 80);
    doc.text(`Insurance Duration: ${duration} months`, 10, 90);
    doc.text(
      `Start Date: ${new Date(startDate).toLocaleDateString()}`,
      10,
      100
    );
    doc.text(`Insurance Price: €${insurancePrice} `, 10, 110);

    let pdfUrl = doc.output("bloburl");
    $("#downloadQuote").attr("href", pdfUrl);
    $("#downloadQuote").attr("download", "insurance_quote.pdf");
  });

  function calculateAge(dob) {
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    let m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  function calculateInsurancePrice(age) {
    if (age >= 17 && age <= 21) {
      return 20;
    } else if (age >= 22 && age <= 25) {
      return 15;
    } else {
      return 10;
    }
  }
});
