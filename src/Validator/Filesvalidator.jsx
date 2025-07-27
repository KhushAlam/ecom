export default function Filesvalidator(e) {
    let { files } = e.target;

    if (files.length === 0) {
        return "Pic field is Mandatory";
    } else if (files.length === 1) {
        let file = files[0]; // ✅ use different variable name
        if (file.size > 1048576) {
            return "File is too large, please upload a file up to 1 MB";
        } else if (
            file.type === "image/jpeg" ||
            file.type === "image/jpg" ||
            file.type === "image/png" ||
            file.type === "image/gif"
        ) {
            return ""; // ✅ valid
        } else {
            return "Invalid file. Please upload .jpeg, .jpg, .png, or .gif";
        }
    } else {
        var errormassege = [];
        Array.from(e.target.files).forEach((file, index) => {
            if (file.size > 1048576) {
                errormassege.push(`${index + 1}File is too large, please upload a file up to 1 MB`);
            }
            else if (file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/png" ||
                file.type === "image/gif");
            else {
                errormassege.push(`Invalid pic ${index + 1}. Please upload .jpeg, .jpg, .png, or .gif`)
            }
        })
        return errormassege.length===0?"":errormassege.toString()
    }
}
