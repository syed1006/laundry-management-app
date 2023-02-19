
const generateCode = (n)=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789';
    let code = "";
    for(let i = 0; i < n; i++){
        code += characters[Math.floor(Math.random() * characters.length)];
    }
    return code;
}

module.exports = generateCode;