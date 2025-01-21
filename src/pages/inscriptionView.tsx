import React from 'react';

export default function InscriptionView() {
    return (
        <div>
            <form>
                <input placeholder="Nom" />
                <input placeholder="Prénom" />
                <input placeholder="E-mail" />
                <input placeholder="Mot de passe" />
                <button type="submit">Créer le compte</button>
            </form>
        </div>
    )
}