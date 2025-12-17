(function () {
    const form = document.getElementById("demoForm");
    const email = document.getElementById("email");
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");
    const dept = document.getElementById("dept");
    const product = document.getElementById("product");
    const submitBtn = document.getElementById("submitBtn");

    const emailErr = document.getElementById("emailErr");
    const dateErr = document.getElementById("dateErr");
    const deptErr = document.getElementById("deptErr");
    const productErr = document.getElementById("productErr");
    const hearErr = document.getElementById("hearErr");

    function show(el, msg) {
      if (msg) el.textContent = msg;
      el.classList.remove("hidden");
    }
    function hide(el) {
      el.classList.add("hidden");
      el.textContent = "";
    }

    function isNumeric(v) {
      return !isNaN(Number(v)) && v !== "";
    }

    function validEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    submitBtn.addEventListener("click", function () {
      // clear
      hide(emailErr);
      hide(dateErr);
      hide(deptErr);
      hide(productErr);
      hide(hearErr);

      let valid = true;
      const vEmail = email.value.trim();
      const vDay = day.value.trim();
      const vMonth = month.value.trim();
      const vYear = year.value.trim();
      const vDept = dept.value;
      const vProduct = product.value.trim();
      const vHear = !!document.querySelector('input[name="hear"]:checked');

      // Email
      if (!validEmail(vEmail)) {
        show(emailErr, "Please enter a valid email address");
        valid = false;
      }

      // Date validation
      if (!(isNumeric(vDay) && Number(vDay) >= 1 && Number(vDay) <= 31)) {
        show(dateErr, "Please enter valid day (1-31)");
        valid = false;
      } else if (!(isNumeric(vMonth) && Number(vMonth) >= 1 && Number(vMonth) <= 12)) {
        show(dateErr, "Please select a valid month (1-12)");
        valid = false;
      } else if (!(isNumeric(vYear) && Number(vYear) >= 1900 && Number(vYear) <= 2100)) {
        show(dateErr, "Please enter a valid year (1900-2100)");
        valid = false;
      }

      // Department
      if (!vDept) {
        show(deptErr, "Please select a department");
        valid = false;
      }

      // Product textarea required
      if (!vProduct) {
        show(productErr, "Please tell us what product you are interested in");
        valid = false;
      }

      // Radio
      if (!vHear) {
        show(hearErr, "Please select how you heard about us");
        valid = false;
      }

      if (valid) {
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        setTimeout(function () {
          alert("Form submitted successfully — thank you!");
          form.reset();
          submitBtn.textContent = "Request a Demo";
          submitBtn.disabled = false;
        }, 700);
      }
    });

    // Clear errors
    [email, day, month, year, dept, product].forEach(function (el) {
      el.addEventListener("input", function () {
        if (el === email) hide(emailErr);
        if (el === day || el === month || el === year) hide(dateErr);
        if (el === dept) hide(deptErr);
        if (el === product) hide(productErr);
      });
    });
    document.querySelectorAll('input[name="hear"]').forEach(function (r) {
      r.addEventListener("change", function () {
        hide(hearErr);
      });
    });
  })();