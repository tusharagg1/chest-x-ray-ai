import './loading.css';

const Loading = () => {
    return (
        <div style={{position: 'fixed', top:0, left:0, width:'100%', height:'100%', backgroundColor:'rgb(224 231 255)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:9999}}>
            <div className='loading-spinner'></div>
        </div>
    );
};

export default Loading;