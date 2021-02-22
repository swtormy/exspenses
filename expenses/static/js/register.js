const usernameField=document.querySelector("#usernameField");
const feedbackArea=document.querySelector(".invalid-feedback");
const emailField=document.querySelector("#emailField");
const emailFeedbackArea=document.querySelector(".emailFeedbackArea");
const passwordField=document.querySelector("#passwordField");
const usernameSuccessOutput=document.querySelector(".usernameSuccessOutput");
const showPasswordToggle=document.querySelector(".showPasswordToggle");
const submitBtn=document.querySelector(".submit-btn");


const handleToggleInput = (e) => {
    if (showPasswordToggle.textContent==="Показать") {
        showPasswordToggle.textContent="Скрыть";
        passwordField.setAttribute("type", "text");
    } else {
        showPasswordToggle.textContent="Показать"
        passwordField.setAttribute("type", "password");
    }
};

showPasswordToggle.addEventListener('click', handleToggleInput);

emailField.addEventListener('keyup', (e)=>{
    const emailVal = e.target.value;
    
    emailField.classList.remove("is-invalid");
    emailFeedbackArea.style.display="none";



    if (emailVal.length > 0) {
        fetch("/authentication/validate-email", {
            body: JSON.stringify({ email: emailVal }),
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                //console.log(usernameField);
                
                if (data.email_error) {
                    //console.log('username == error')
                    submitBtn.disabled = true;
                    emailField.classList.add("is-invalid");
                    emailFeedbackArea.style.display="block";
                    emailFeedbackArea.innerHTML=`<small>${data.email_error}</small>`;
                } else {
                    if (usernameField.value != "" || passwordField.value != "" ) {
                        submitBtn.removeAttribute("disabled");
                    }
                }
        });
    }
});


usernameField.addEventListener("keyup", (e) => {
    const usernameVal = e.target.value;
    usernameSuccessOutput.style.display="block";
    usernameSuccessOutput.textContent = `Проверка ${usernameVal}`;
    
    usernameField.classList.remove("is-invalid");
    feedbackArea.style.display="none";



    if (usernameVal.length > 0) {
        fetch("/authentication/validate-username", {
            body: JSON.stringify({ username: usernameVal }),
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                usernameSuccessOutput.style.display="none";
                if (data.username_error) {
                    //console.log(usernameField);
                    //console.log('username == error')
                    usernameField.classList.add("is-invalid");
                    feedbackArea.style.display="block";
                    feedbackArea.innerHTML=`${data.username_error}`;
                    submitBtn.disabled = true;
                    
                } else {
                    if (emailField.value != "" || passwordField.value != "" ) {
                        submitBtn.removeAttribute("disabled");
                    }
                }
        });
    }
});


