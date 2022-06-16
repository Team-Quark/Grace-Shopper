import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllShoes } from '../store/allshoes';

// const AllShoes = (props) => {
//     console.log(props)
//     const [shoes, setShoes] = useState([]);
    
//     useEffect(() => {
//         console.log('useEff')
//         props.fetchAllShoes();
//         if(props.shoes.length > 0 && !shoes.length){
//             setShoes(props.shoes[0])
//         }
//         console.log(shoes)
//     },[]);

//     let data = props.shoes ? props.shoes : [];

    // return (
    //     <div>
            // <h5>{console.log('render')}</h5>
            // <h5>{data[0].name}</h5>
            // <h5>${props.shoes.price}</h5>
            // <h5>{props.shoes.availableSize}</h5>
    //     </div>
    // )
// }

class AllShoes extends React.Component{
    constructor(){
        super();
    }

    componentDidMount() {
        this.props.fetchAllShoes();
    }

    render(){
        return (
            <div>
                {this.props.shoes.map(shoe => {
                    return (
                        <div key={shoe.id}>
                            <h1>{shoe.name}</h1>
                            <h3>$${shoe.price}</h3>
                            <h5>{shoe.description}</h5>
                            <img src={shoe.imageUrl} />     
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        shoes: state.allshoes
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchAllShoes: () => dispatch(fetchAllShoes())
}}

export default connect(mapState,mapDispatch)(AllShoes)
