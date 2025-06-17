import React from 'react';

const SampleNames = ({ names, onSelect }) => {
    return (
        <div className="samples">
            Try...{' '}
            {names.map((name, index) => (
                <span key={name}>
                    {index == names.length - 1 && ' Or '}
                    <span className="sample-name" onClick={() => onSelect(name)}>
                        {name}
                    </span>
                    {index < names.length - 2 ? ', ' : ''}
                </span>
            ))}
        </div>
    );
};

export default SampleNames;
