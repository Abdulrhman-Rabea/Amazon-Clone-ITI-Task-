// const formBtn = document.querySelector(".signInform button")
// let userInput = document.querySelector(".form-control")
// const SubmitBtn = document.querySelector(".btn")


// userInput.addEventListener('keyup', () => {

//     let input = Number(userInput.value)
//     if (input == "NaN") {
//         console.log("string")
//         document.querySelector(".form-select").style.display = "none"
//     } else {
//         console.log("number")
//         document.querySelector(".form-select").style.display = "block"
//     }

// })
$(document).ready(function () {

    // Input detection (email vs number) 
    $("#exampleInputEmail1").on("keyup", function () {
        let inputVal = $(this).val();

        // check if number or string then show or hide this input 
        if ($.isNumeric(inputVal)) {
            $(".form-select").show();
        } else {
            $(".form-select").hide();
        }
    });

    // Bootstrap validation + Authentication
    $(".signInform").on("submit", function (event) {
        event.preventDefault();

        let form = this;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let emailOrPhone = $("#exampleInputEmail1").val();
            let password = $("#passwordInput").val();

            let storedUser = JSON.parse(localStorage.getItem("user"));

            if (!storedUser) {
                window.location.href = "login.html";
                return;
            }

            if ((storedUser.email === emailOrPhone || storedUser.phone === emailOrPhone) &&
                storedUser.password === password) {
                window.location.href = "index.html";
            } else {
            }
        }

        $(form).addClass("was-validated");
    });
});
