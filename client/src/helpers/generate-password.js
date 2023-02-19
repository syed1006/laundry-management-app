const generatePassword = (n)=>{

    let password = "";
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghigklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbol = '!@#$%&';
    const characters = lower + upper + numbers + symbol;

    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    for(let i = 4; i < n; i++){
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    console.log(password);
    return password;
}

export default generatePassword;