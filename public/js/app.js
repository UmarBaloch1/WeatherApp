console.log('this is the js inside html')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const mseg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')


weatherform.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value

mseg1.textContent = 'Loading........'
msg2.textContent = ''

fetch('http://localhost:3000/weather?address='+location).then ((response) => {
response.json().then((data)=>{
    if (data.error){
       msg1.textContent = data.error
    }
    else{
        mseg1.textContent = data.forecast
        msg2.textContent = 'Location is ' +location
    }

})
})
})