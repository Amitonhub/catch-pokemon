import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/PokemonForm.css';

const PokemonForm = ({ onSuccess, existingData = null }) => {
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [status, setStatus] = useState('active');
    const [abilities, setAbilities] = useState([
        { ability: '', type: '', damage: '', status: 'active' }
    ]);

    useEffect(() => {
        if (existingData) {
            setName(existingData.master.name || '');
            setPreview(existingData.master.image || null);
            setStatus(existingData.master.status || 'active');
            setAbilities(existingData.abilities || [
                { ability: '', type: '', damage: '', status: 'active' }
            ]);
        }
    }, [existingData]);

    const handleAddAbility = () => {
        setAbilities([...abilities, { ability: '', type: '', damage: '', status: 'active' }]);
    };

    const handleChangeAbility = (index, field, value) => {
        const updated = [...abilities];
        updated[index][field] = value;
        setAbilities(updated);
    };

    const resetForm = () => {
        setAbilities([]);
        setName('');
        setImageFile(null);
        setPreview(null);
        setStatus('active');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            if (imageFile) formData.append('image', imageFile);
            formData.append('status', status);

            let masterId;

            if (existingData) {
                const res = await axios.put(
                    `${process.env.REACT_APP_API_URL}/master/${existingData.master._id}`,
                    Object.fromEntries(formData)
                );
                masterId = res.data._id;
            } else {
                const masterRes = await axios.post(`${process.env.REACT_APP_API_URL}/master`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                masterId = masterRes.data._id;

                for (let ab of abilities) {
                    await axios.post(`${process.env.REACT_APP_API_URL}/ability`, {
                        ...ab,
                        masterId,
                    });
                }
            }

            alert(`Pokemon ${existingData ? 'updated' : 'added'} successfully!`);
            onSuccess();
            resetForm()
        } catch (err) {
            alert(`Error ${existingData ? 'updating' : 'adding'} Pokemon.`);
            console.error(err);
        }
    };

    return (
        <div className="status-box add-form-box">
            <h2>{existingData ? 'Update Pokemon' : 'Add New Pokemon'} (xxx)</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    placeholder="Pokemon Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setImageFile(file);
                            setPreview(URL.createObjectURL(file));
                        }
                    }}
                />
                {preview && (
                    <div className="image-preview">
                        <img src={preview} alt="Preview" />
                    </div>
                )}
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <h3>Abilities</h3>
                {abilities.map((ab, index) => (
                    <div key={index} className="ability-inputs">
                        <input
                            type="text"
                            placeholder="Ability"
                            value={ab.ability}
                            onChange={(e) => handleChangeAbility(index, 'ability', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Type"
                            value={ab.type}
                            onChange={(e) => handleChangeAbility(index, 'type', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Damage"
                            value={ab.damage}
                            onChange={(e) => handleChangeAbility(index, 'damage', e.target.value)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddAbility} className="add-btn">
                    + Add Ability
                </button>
                <br />
                <button type="submit">{existingData ? 'Update Pokemon' : 'Submit Pokemon'}</button>
            </form>
        </div>
    );
};

export default PokemonForm;
