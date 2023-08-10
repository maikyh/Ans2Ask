function validatePassword(password) {
    // Check for at least 8 of length
    if (password.length < 8) return false;

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) return false;

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) return false;

    // Check for at least one digit
    if (!/\d/.test(password)) return false;

    return true;
}

export { validatePassword };