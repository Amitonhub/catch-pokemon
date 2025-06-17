import React from 'react';
import './styles/PokemonDetails.css';

const PokemonDetails = ({ data, onDelete, onEdit }) => {
    return (
        <div className="status-box pokemon-box">
            <h2>{data.master.name}</h2>
            <img src={data.master.image} alt={data.master.name} />
            <p>Status: {data.master.status}</p>

            <h3>Abilities:</h3>
            <ul>
                {data.abilities.map((a, index) => (
                    <li key={index}>
                        <strong>{a.ability}</strong> ({a.type}) – Damage: {a.damage}
                    </li>
                ))}
            </ul>

            <div className="action-buttons">
                <button className="update-btn" onClick={() => onEdit(data)}>
                    Update
                </button>
                <button className="delete-btn" onClick={() => onDelete(data.master._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PokemonDetails;
