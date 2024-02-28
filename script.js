const sliderVal = document.getElementById('sliderValue')
const charCount = document.querySelector('.char__count')

const btn = document.querySelector('.btn')
const container = document.querySelector('.generate-container')

const password = document.querySelector('.password')

const uppercase = document.getElementById('uppercase')
const lowercase = document.getElementById('lowercase')
const numbers = document.getElementById('numbers')
const symbols = document.getElementById('symbols')

const bars = document.querySelectorAll('.bar')
const errorMessage = document.querySelector('.strength__message')

const copyBtn = document.querySelector('.copyBtn')


copyBtn.addEventListener('click',function(){
    const copyText =password.innerText
    navigator.clipboard.writeText(copyText);
    copyBtn.querySelector('.copyMessage').innerHTML ='Copied!'
    setTimeout(()=>{
        copyBtn.querySelector('.copyMessage').innerHTML =''
    },500)
})
sliderVal.addEventListener('input',function(){
    let val = ((sliderVal.value / sliderVal.max) )* 100
    sliderVal.style.background = `linear-gradient(to right, #a3ffae ${val}%, #23222a ${val}%)`
    charCount.innerHTML = `${sliderVal.value}`
})
const checkboxes = document.querySelector('.checkboxes')
function showError(message){
    container.classList.add('show')
        document.querySelector('.error-message').innerHTML=message
        setTimeout(()=>{
            container.classList.remove('show')
        },3000)
}
btn.addEventListener('click',function(e){
    const checkbox = document.querySelector("input[type=checkbox]:checked")
    let upperVal = uppercase.checked
    let lowerVal = lowercase.checked
    let symbolsVal = symbols.checked
    let numbersVal = numbers.checked
    if(+sliderVal.value == 0){
      showError('Please select the password length!') 
      return
    }
    else if(!checkbox){
        showError('Please choose the options!! ') 
        return
    }
    else{
        password.style.color='#e7e6eb'
        let results=generatePassword(+sliderVal.value,upperVal,lowerVal,symbolsVal,numbersVal)
        copyBtn.removeAttribute('disabled')
        password.innerHTML = results
        if(results.length > 10)  {
            password.classList.add( 'small')   
        } 
        else{
            password.classList.remove( 'small')   
        }
       
    }
    updateBar(+sliderVal.value,upperVal,lowerVal,symbolsVal,numbersVal)
})
function checkExist(ele,name){
    if(ele.classList.contains(name)){
        ele.classList.remove(name)
    }
}
function showStrength(classname,msg,index){
    errorMessage.innerHTML = classname
    errorMessage.classList.add(msg)
    for(let i=0;i<bars.length-index;i++){
        bars[i].classList.add(classname) 
     }
}
function updateBar(passLength,upper,lower,symbol,number){
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    bars.forEach(bar=>{
        checkExist(bar,'low')
        checkExist(bar,'strong')
        checkExist(bar,'moderate')
    })
    checkExist(errorMessage,'low-message')
    checkExist(errorMessage,'strong-message')
    checkExist(errorMessage,'moderate-message')
    if(passLength >= 8 && typesArr.length == 4){
        showStrength('strong','strong-message',0)
    }
    if(passLength > 8 && typesArr.length == 3){

        showStrength('moderate','moderate-message',1)
    }
    if(passLength > 8 && typesArr.length == 2){
        showStrength('low','low-message',2)
    }
    if(passLength > 8 && (typesArr.length == 1 || typesArr.length == 0) ){
        showStrength('low','low-message',3)
    }
    if(passLength < 8 && typesArr.length){
        errorMessage.classList.add('low-message')
        errorMessage.innerHTML = 'low'
        bars[0].classList.add('low') 
    }
}
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
function generatePassword(passLength,upper,lower,symbol,number){
    let result=''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    for(let i = 0; i < passLength; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            result += randomFunc[funcName]()
        })
    }

    const finalPassword = result.slice(0, passLength)
    return finalPassword
}


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}