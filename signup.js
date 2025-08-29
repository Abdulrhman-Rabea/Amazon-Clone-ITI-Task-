
$(document).ready(function () {

    $("#signupForm").on("submit", function (event) {
        event.preventDefault();
        let form = this;

        let name = $("#name").val();
        let phone = $("#phone").val();
        let password = $("#password").val();
        let confirmPassword = $("#confirmPassword").val();

        let valid = true;

        //  Name Validation
        if (name.length < 3 || /[0-9]/.test(name)) {
            $("#name")[0].setCustomValidity("Invalid");
            valid = false;
        } else {
            $("#name")[0].setCustomValidity("");
        }

        //  Phone Validation
        if (!/^[0-9]+$/.test(phone)) {
            $("#phone")[0].setCustomValidity("Invalid");
            valid = false;
        } else {
            $("#phone")[0].setCustomValidity("");
        }

        //  Password Match Validation
        if (password !== confirmPassword) {
            $("#confirmPassword")[0].setCustomValidity("Passwords do not match");
            valid = false;
        } else {
            $("#confirmPassword")[0].setCustomValidity("");
        }

        if (form.checkValidity() === false || !valid) {
            event.stopPropagation();
        } else {
            // Save user in localStorage
            let user = {
                name: name,
                phone: phone,
                password: password
            };
            localStorage.setItem("user", JSON.stringify(user));

            window.location.href = "login.html";
        }

        $(form).addClass("was-validated");
    });

});