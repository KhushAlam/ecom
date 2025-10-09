var passwordValidator = require('password-validator');
var schema = new passwordValidator();

schema
    .is().min(6)                                    // Minimum length 6
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have uppercase letters
    .has().lowercase(1)                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', "Password@123", "User123", "User@123"]); // Blacklist these values

export default function Formvalidator(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
            if (value && value.length === 0) {
                return name + "Field is Mendatory"
            }
            else if (value.length < 3 || value.length > 50) {
                return name + "Lenght must be 3-50 Character"
            }
            else {
                return ""
            }

        case "subject":
            if (value && value.length === 0) {
                return name + "Field is Mendatory"
            }
            else if (value.length < 3 || value.length > 50) {
                return name + "Lenght must be 3-50 Character"
            }
            else {
                return ""
            }
        case "username":
            if (value && value.length === 0) {
                return name + "Field is Mendatory"
            }
            else if (value.length < 3 || value.length > 50) {
                return name + "Lenght must be 3-50 Character"
            }
            else {
                return ""
            }
        case "phone":

            if (value && value.length === 0) {
                return name + "Field is Mendatory"
            }
            else if (value.length < 10 || value.length > 10) {
                return "Length Must be 10"
            }
            else if (value.startsWith("9") || value.startsWith("8") || value.startsWith("7") || value.startsWith("9")) {
                return ""
            }
            else {
                return ""
            }

        case "email":
            if (value && value.length === 0) {
                return name + "Field is Mendatory"
            }
            else if (value.length < 13 || value.length > 100) {
                return "Length Must be in b/w 13-100"
            }
            else if (!value.endsWith("@gmail.com")) {
                return "Please enter valid Email"
            }
            else {
                return ""
            }

        case "password":
            if (value && value.length === 0) {
                return name + "Field is Mendatory"
            }
            else if (!schema.validate(value)) {
                return "Password must be Contains at Least 6 length One uppercase One lowercase Not Space Atleast one digit"
            }
            else {
                return ""
            }


        case "color":
            if (value && value.length === 0) {
                return name + "Field is Mendatory"
            }
            else {
                return ""
            }


        case "size":
            if (!value) {
                return name + " Field is Mendatory"
            }
            else if (Number(value) <= 0 || Number(value) > 100) {
                return "Size must be greater than 0 and less than 100"
            }
            else {
                return ""
            }

        case "basePrice":
            if (value && value.length === 0) {
                return name + "Field is Mendatory"
            }
            else if (value < 1) {
                return "BasePrice must be Positive or Greater than 0."
            }
            else {
                return ""
            }

        case "disCount":
            if (!value) {
                return name + "Field is Mendatory"
            }
            else if (Number(value) <= 0 || Number(value) >= 100) {
                return name + " must be more then 0% and less then 99%"
            }
            else {
                return ""
            }

        case "stockQuantity":
            if (value && value.length === 0) {
                return name + "Feild is Mendatory"
            }
            else if (value <= 0) {
                return "Stockquentity must be positive and more then 0"
            }
            else {
                return ""
            }


        case "message":
            if (value && value.length === 0) {
                return name + "Feild is Mendatory"
            }
            else if (value.length < 50) {
                return name + "Length must be 50 character or more"
            }
            else {
                return ""
            }
        default:
            return ""
    }
}

