  //  Toggling mailing option visibility -- outside of onsubmit
  let format = document.getElementById("format");

  mlist.addEventListener('change', () => {
    format.style.display = mlist.checked ? "block" : "none";
  });

  let otherLabel = document.getElementById("otherlabel");
  meet.addEventListener("change", (e) => {
    if (e.target.value === "other") {
      otherLabel.style.display = "block";
    } else {
      otherLabel.style.display = "none";
    }
  });
  
  
  document.getElementById("contact-form").onsubmit = () => {
  
    clearErrors();

     let isValid = true;
    
    // Validate first name
    let fname = document.getElementById("fname").value.trim();
    if(!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    } 

    // Validate last name
    let lname = document.getElementById("lname").value.trim();
    if(!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    // Validate email if provided
    let email = document.getElementById("email").value.trim();
    let check = document.getElementById("mlist");
    if (email){

      const regex = /.*\@.*\..*/;

      if (!email.match(regex)){
        document.getElementById("err-email").style.display = "block";
        isValid = false;
      }

    } else {
      if (mlist.checked) {
        document.getElementById("err-email2").style.display = "block";
        isValid = false;
      }
    }

    // Validate linkedin if provided
    let linkedIn = document.getElementById("linkedin").value.trim();
    if (linkedIn) {
        const regex = /^https:\/\/linkedin.com\/in\/.*/;

        if (!linkedIn.match(regex)){
          document.getElementById("err-linkedin").style.display = "block";
          isValid = false;
        }
    }

  // Validate "how we met"
  let meet = document.getElementById("meet");

  let meetVal = document.getElementById("meet").value;
  let other = document.getElementById("other").value;
  if(meetVal == "none") {
      document.getElementById("err-meet").style.display = "block";
      isValid = false;
  } else if (meetVal == "other" && !other) {
      document.getElementById("err-other").style.display = "block";
      isValid = false;
  }

    return isValid;

  }

  function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
  }