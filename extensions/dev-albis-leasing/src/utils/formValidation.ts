export const isDate21orMoreYearsOld = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 21);
  
    // Format the date as "YYYY-MM-DD"
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits for month
    const day = today.getDate().toString().padStart(2, '0'); // Ensure two digits for day
  
    return `${year}-${month}-${day}`;
  }

export const isFormFilled = (initial=false) => {
    const form = document.getElementById('alr-form');

    if (!form) return
  
    const submitButton = document.getElementById('modal-button');
    const requiredInputFields = form.querySelectorAll<HTMLInputElement>('input[required]');
    const requiredSelectFields = form.querySelectorAll<HTMLSelectElement>('select[required]');

    if (!submitButton) return
    if(initial) {
      submitButton.setAttribute("disabled", "");
    }
  
    form.addEventListener("change", function() {
        const allInputsFilled = Array.from(requiredInputFields).every((field) =>  {
          if (field.type === "checkbox") {
            return field.checked !== false;
          }else {
            return field.value.trim() !== "";
          } 
        });
        const allSelectsFilled = Array.from(requiredSelectFields).every((field) => field.selectedIndex !== 0);

        if (allInputsFilled && allSelectsFilled) {
          submitButton.removeAttribute("disabled");
        } else {
          submitButton.setAttribute("disabled", "");
        }
      });
  };

  export const resetForm = () => {
    const form = document.getElementById('alr-form');

    if (!form) return

    const requiredInputFields = form.querySelectorAll<HTMLInputElement>('input[required]');
    const requiredSelectFields = form.querySelectorAll<HTMLSelectElement>('select[required]');

    requiredInputFields.forEach(function (input) {
      if (input.type === "checkbox") {
        input.checked = false;
      }else {
        input.value = "";
      } 
    });

    requiredSelectFields.forEach(select => {
      select.selectedIndex= 0;
    });
  }