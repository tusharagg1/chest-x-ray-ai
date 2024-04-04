/*
* Author: Allison Cook
* Date Created: March 2024
* Purpose: Create the loading object and container to be used on the loading of the X-ray page
*/
import './loading.css';

const Loading = () => {
  return (
    // creating the loading element container
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(224 231 255)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div className='loading-spinner'></div>
    </div>
  );
};

export default Loading;
