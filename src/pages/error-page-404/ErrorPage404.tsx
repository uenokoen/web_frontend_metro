import React from 'react';
import Img404 from '../../assets/404.png'
const ErrorPage404: React.FC = () => {
    return (
        <div style={styles.container}>
            <img src={Img404} alt={'404 img'} className={'w-100'}/>
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

export default ErrorPage404;
