import React from 'react';
import Img403 from '../../assets/403.png'
const ErrorPage403: React.FC = () => {
    return (
        <div style={styles.container}>
            <img src={Img403} alt={'403 Img'} className={'w-100'}/>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        color: '#333',
    },
};

export default ErrorPage403;
