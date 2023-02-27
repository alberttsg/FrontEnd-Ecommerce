import React from 'react';

const HeaderButton = ({icon, handleClick, children}) => {
    return (
        <button onClick={handleClick} className='user-button'>
            {icon}{children}
        </button>
    );
};

export default HeaderButton;