export function valida(input){
    const tipoDeInput =  input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    if(input.validity.valid){
        
        input.parentElement.classList.remove('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = ''
    }else{
        input.parentElement.classList.add('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajDeError(tipoDeInput, input)
    }
}

const tipoDeErrores= [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError']

const mensajesDeError={
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacio'
    },
    email: {
        valueMissing: 'El campo correo no puede estar vacio',
        typeMismatch: 'El correo no es valido'
    },
    password:{
        valueMissing: 'El campo contraseña no puede estar vacio',
        patternMismatch:'Al menos 6 caracteres, maximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.'
    },
    nacimiento:{
        valueMissing: 'Este campo no puede estar vacio',
        customError:'debes tener al menos 18 añosde edad'
    },
    numero:{
        valueMissing:'El campo numero de telefono no puede estar vacio',
        patternMismatch:'El formato requerido es XXXXXXXXXX (10 numeros)'
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:'La direccion debe contener entre 4 y 30 caracteres'
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:'La ciudad debe contener entre 4 y 30 caracteres'
    },
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:'El Estado debe contener entre 4 y 30 caracteres'
    }

}
const validadores = {
    nacimiento: (input) => validarNacimiento(input),

}

function mostrarMensajDeError(tipoDeInput, input){

    let mensaje=''
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            mensaje=mensajesDeError[tipoDeInput][error]
        }
    })
    return mensaje
}


const inputNacimiento = document.querySelector('#birth')

inputNacimiento.addEventListener('blur', (event)=>{
    validarNacimiento(event.target)
})

function validarNacimiento(input){
    const fecha = new Date(input.value)
    let mensaje =''
    if(!mayorDeEdad(fecha))
    {
        mensaje = 'Debes tener al menos 18 años de edad'
    }
    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha){
    const fechaActual = new Date()
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(),
        fecha.getUTCDate())
    console.log(diferenciaFechas)
    return diferenciaFechas <= fechaActual
}