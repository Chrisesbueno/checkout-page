const item = document.getElementsByClassName('itemInfo');
const arrayItem = [...item];
arrayItem.forEach(element => {
    /* VARIABLES Y CODIGOS PARA SUMAR Y RESTAR CANTIDAD DE ITEMS -START- */
    let value = 0;
    const setItem = element.children[1];
    const addItem = setItem.children[2];
    const restItem = setItem.children[0];
    addItem.addEventListener('click', function add() {
        value++;
        setValue(value);
        setTotal(true);
    });
    restItem.addEventListener('click', function rest() {
        if (value === 0) return;
        value--;
        setValue(value);
        setTotal(false);
    });
    function setValue(val) {
        valueItem = setItem.children[1];
        valueItem.innerHTML = val;
    }
    /* VARIABLES Y CODIGOS PARA SUMAR Y RESTAR CANTIDAD DE ITEMS -END- */
    function setTotal(e) {
        let shipping = 9.50; // esto es el precio por cada item de shipping
        let totalShipping = Number((document.getElementById('shipping').innerHTML).slice(1)); // esto es el precio del shipping
        let price = Number((element.children[0].children[1].children[0].innerHTML).slice(1)); // esto es el precio del item
        let totalPrice = Number((document.getElementById('totalPrice').innerHTML).slice(1)); // esto es el precio del total de items
        // console.log(price, totalPrice, shipping, totalShipping)
        if (e) {
            document.getElementById('shipping').innerHTML = '$' + String((totalShipping + shipping).toFixed(2));
            document.getElementById('totalPrice').innerHTML = '$' + String((totalPrice + price).toFixed(2));
        } else {
            document.getElementById('shipping').innerHTML = '$' + String((totalShipping - shipping).toFixed(2));
            document.getElementById('totalPrice').innerHTML = '$' + String((totalPrice - price).toFixed(2));
        }
    }
});

// console.log(document.getElementsByClassName('itemInfo'))

/* ESTO ES EL API PARA SELECCIONAR PAISES NO SE SI SEA BUENA PRACTICA HACERLO AQUI */
function createOption(element) {
    return document.createElement(element);
}

function append(parent, element) {
  return parent.appendChild(element);
}

const select = document.getElementById('formCountry');
const url = 'https://restcountries.com/v2/all?fields=name';

fetch(url)
    .then(response => response.json())
    .then(function(data) {
        return data.map(function(country) {
            let option = createOption('option');
            option.innerHTML = country.name
            append(select, option);
        })
    })
    .catch(function(error) {
        console.log(error);
    });

/* ESTO ES EL API PARA SELECCIONAR PAISES NO SE SI SEA BUENA PRACTICA HACERLO AQUI */

/* SUBMIT CON ALERT */

function setSubmit(e) {
    // e.preventD
    const email = document.getElementById('formEmail').value;
    const phone = document.getElementById('formPhone').value;
    const fullname = document.getElementById('formName').value;
    const city = document.getElementById('formCity').value;
    const country = document.getElementById('formCountry').value;
    const postal = document.getElementById('formPostal').value;
    const shipping = Number((document.getElementById('shipping').innerHTML).slice(1));
    const total = Number((document.getElementById('totalPrice').innerHTML).slice(1));
    const check = document.getElementById('check');
    
    let value = false;
    if (email != '' && email != '' && phone != '' && fullname != '' && city != '' && country != '' && postal != '') {
        value = true
    }
    if (value == true && shipping !=0 && total != 0) {  
        confirm(`
        || Your information was sent successfully ||
        Your E-mail: ${email}
        Your phone: ${phone}
        Your fullname: ${fullname}
        Your city: ${city}
        Your country: ${country}
        Your postal: ${postal}
        Shipping Price: $${shipping}
        Total Price: $${total}
        `);
        if (check.checked === true) {
            alert('Your information was saved correctly')
        } else {
            location.reload()
        }
    } else {
        alert("Please enter your info and items");
        return false;
    } 
    
    // function reset() {
    //     document.querySelector('form').action = '/'
    // }
}

