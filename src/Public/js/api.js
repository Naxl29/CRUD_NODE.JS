const BASE_URL = 'http://localhost:3000/api';

function showMessage(msg, type) {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = msg;
        messageDiv.style.color = (type === 'error' ? 'red' : 'green');
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.style.color = '';
        }, 5000);
    }
}

async function createPersona(personaData) {
    try {
        const response = await fetch(`${BASE_URL}/persona`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personaData)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error desconocido al crear la persona.');
        }
        return data;
    } catch (error) {
        console.error('Error en createPersona:', error);
        showMessage(error.message, 'error');
        throw error;
    }
}

async function getPersonas() {
    try {
        const response = await fetch(`${BASE_URL}/personas`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error desconocido al obtener las personas.');
        }
        return data.personas;
    } catch (error) {
        console.error('Error en getPersonas:', error);
        showMessage(error.message, 'error');
        return [];
    }
}

async function getPersonaById(id) {
    try {
        const response = await fetch(`${BASE_URL}/persona/${id}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Persona no encontrada.');
        }
        return data.persona;
    } catch (error) {
        console.error(`Error en getPersonaById para ID ${id}:`, error);
        showMessage(error.message, 'error');
        throw error;
    }
}

async function updatePersona(id, personaData) {
    try {
        const response = await fetch(`${BASE_URL}/persona/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personaData)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error desconocido al actualizar la persona.');
        }
        return data;
    } catch (error) {
        console.error(`Error en updatePersona para ID ${id}:`, error);
        showMessage(error.message, 'error');
        throw error;
    }
}

async function deletePersona(id) {
    try {
        const response = await fetch(`${BASE_URL}/persona/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error desconocido al eliminar la persona.');
        }
        return data;
    } catch (error) {
        console.error(`Error en deletePersona para ID ${id}:`, error);
        showMessage(error.message, 'error');
        throw error;
    }
}