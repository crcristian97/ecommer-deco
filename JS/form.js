// Constantes para la validación
const VALIDATION_PATTERNS = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    phone: /^\+?[1-9]\d{1,3}[-. ]?\d{1,14}$/,
};

const ERROR_MESSAGES = {
    name: {
        required: 'Por favor, ingresa tu nombre completo',
        invalid: 'El nombre solo debe contener letras y espacios',
    },
    email: {
        required: 'Por favor, ingresa tu correo electrónico',
        invalid: 'Por favor, ingresa un correo electrónico válido',
    },
    phone: {
        required: 'Por favor, ingresa tu número de teléfono',
        invalid: 'Por favor, ingresa un número de teléfono válido',
    },
    message: {
        required: 'Por favor, ingresa tu mensaje',
        tooShort: 'El mensaje debe tener al menos 10 caracteres',
    },
};

// Función para validar un campo específico
function validateField(value, pattern, errorMessages) {
    if (!value) {
        return errorMessages.required;
    }
    if (pattern && !pattern.test(value)) {
        return errorMessages.invalid;
    }
    return null;
}

// Función para mostrar error
function showError(inputElement, message) {
    const parent = inputElement.parentElement;
    let errorDiv = parent.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        parent.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    inputElement.classList.add('border-red-500');
}

// Función para limpiar error
function clearError(inputElement = '') {
    const parent = inputElement.parentElement;
    const errorDiv = parent.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    inputElement.classList.remove('border-red-500');
}

const form = document.getElementById('contactForm');
// Manejador del evento submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    debugger
    let isValid = true;
    
    // Obtener los valores de los campos
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('Telefono');
    
    // Limpiar errores previos
    clearError(nameInput);
    clearError(emailInput);
    clearError(phoneInput);
    
    // Validar nombre
    const nameError = validateField(nameInput.value, VALIDATION_PATTERNS.name, ERROR_MESSAGES.name);
    if (nameError) {
        showError(nameInput, nameError);
        isValid = false;
    }
    
    // Validar email
    const emailError = validateField(emailInput.value, VALIDATION_PATTERNS.email, ERROR_MESSAGES.email);
    if (emailError) {
        showError(emailInput, emailError);
        isValid = false;
    }
    
    // Validar teléfono
    const phoneError = validateField(phoneInput.value, VALIDATION_PATTERNS.phone, ERROR_MESSAGES.phone);
    if (phoneError) {
        showError(phoneInput, phoneError);
        isValid = false;
    }
    
    if (isValid) {
        // Aquí puedes agregar la lógica para enviar el formulario
        console.log('Formulario válido, enviando datos...');
        // this.submit();
    }
});
