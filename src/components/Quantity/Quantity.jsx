import React, { useState, useEffect } from 'react';
import './Quantity.scss'
function Quantity({ value: initialValue, onChange, itemId }) {
    const [value, setValue] = useState(initialValue);

    // Escucha los cambios en initialValue y actualiza el estado local
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleIncrement = () => {
        const newValue = value + 1;
        setValue(newValue); 
       
        onChange({ target: { value: String(newValue) } }, itemId);
    };

    const handleDecrement = () => {
        if (value > 0) {
            const newValue = value - 1;
            setValue(newValue);
   
            onChange({ target: { value: String(newValue) } }, itemId);
        }
    };

    return (
        <div className="button-qty">
            <input type="button" value="-" className="button-qty__decrement" onClick={handleDecrement} />
            <input type="number" step="1" max="100" value={value} name="quantity" className="button-qty__quantity" readOnly />
            <input type="button" value="+" className="button-qty__increment" onClick={handleIncrement} />
        </div>
    );
}

export default Quantity;
