import React from 'react';
// import { useNavigate } from 'react-router-dom';
import navigateContext from '../Context/navigateContext';

export default function NavigateState(props) {
// const navigate = useNavigate();
    const handleNavigate = (path) => {
        // navigate(path);
    }
    return (
        <>
            <navigateContext.Provider value={{ handleNavigate }}>
                {props.children}
            </navigateContext.Provider>
        </>
    )
}
