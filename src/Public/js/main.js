document.addEventListener('DOMContentLoaded', () => {
    const personaForm = document.getElementById('personaForm');
    if (personaForm) {
        personaForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const personaData = {
                primer_nombre: personaForm.primer_nombre.value,
                segundo_nombre: personaForm.segundo_nombre.value,
                primer_apellido: personaForm.primer_apellido.value,
                segundo_apellido: personaForm.segundo_apellido.value,
                n_documento: personaForm.n_documento.value
            };

            try {
                const result = await createPersona(personaData);
                showMessage(`Persona "${result.personaStored.primer_nombre} ${result.personaStored.primer_apellido}" guardada exitosamente.`, 'success');
                personaForm.reset();
            } catch (error) {
            }
        });
    }

    const personasListDiv = document.getElementById('personasList');
    if (personasListDiv) {
        loadPersonas();
    }

    const editPersonaForm = document.getElementById('editPersonaForm');
    if (editPersonaForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const personaId = urlParams.get('id');
        if (personaId) {
            loadPersonaForEdit(personaId);
        } else {
            showMessage('Error: ID de persona no especificado para edición.', 'error');
        }

        editPersonaForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const updatedData = {
                primer_nombre: editPersonaForm.edit_primer_nombre.value,
                segundo_nombre: editPersonaForm.edit_segundo_nombre.value,
                primer_apellido: editPersonaForm.edit_primer_apellido.value,
                segundo_apellido: editPersonaForm.edit_segundo_apellido.value,
                n_documento: editPersonaForm.edit_n_documento.value
            };

            try {
                await updatePersona(personaId, updatedData);
                showMessage('Persona actualizada con éxito.', 'success');
                window.location.href = 'personas.html';
            } catch (error) {
            }
        });
    }
});

async function loadPersonas() {
    const personasListDiv = document.getElementById('personasList');
    if (!personasListDiv) return;

    personasListDiv.innerHTML = '<p>Cargando personas...</p>';

    try {
        const personas = await getPersonas();
        personasListDiv.innerHTML = '';

        if (personas.length === 0) {
            personasListDiv.innerHTML = '<p>No hay personas registradas.</p>';
            return;
        }

        const ul = document.createElement('ul');
        personas.forEach(persona => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${persona.primer_nombre} ${persona.segundo_nombre || ''} ${persona.primer_apellido} ${persona.segundo_apellido || ''} (Doc: ${persona.n_documento})
                <button onclick="redirectToEdit('${persona._id}')">Editar</button>
                <button onclick="confirmAndDelete('${persona._id}', '${persona.primer_nombre} ${persona.primer_apellido}')">Eliminar</button>
            `;
            ul.appendChild(li);
        });
        personasListDiv.appendChild(ul);
    } catch (error) {
        personasListDiv.innerHTML = '<p>Error al cargar las personas.</p>';
    }
}

async function loadPersonaForEdit(id) {
    try {
        const persona = await getPersonaById(id);
        document.getElementById('edit_primer_nombre').value = persona.primer_nombre;
        document.getElementById('edit_segundo_nombre').value = persona.segundo_nombre || '';
        document.getElementById('edit_primer_apellido').value = persona.primer_apellido;
        document.getElementById('edit_segundo_apellido').value = persona.segundo_apellido || '';
        document.getElementById('edit_n_documento').value = persona.n_documento;
    } catch (error) {
        showMessage('No se pudo cargar la persona para edición.', 'error');
        console.error('Error cargando persona para edición:', error);
    }
}

function redirectToEdit(id) {
    window.location.href = `update.html?id=${id}`;
}

async function confirmAndDelete(id, nombreCompleto) {
    if (confirm(`¿Estás seguro de que quieres eliminar a ${nombreCompleto}?`)) {
        try {
            await deletePersona(id);
            showMessage('Persona eliminada con éxito.', 'success');
            loadPersonas();
        } catch (error) {
        }
    }
}