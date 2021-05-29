import React, { Component } from 'react';
import TransferForm from './TransferForm';
import ReactDOM from 'react-dom';
import TranferList from './TranferList';
import url from '../components/url';

export default class Example extends Component {

    constructor(props){
        super(props)

        this.state = {
            money: 0.0,
            transfers:[],
            error:null,
            form:{
                descripcion:'',
                amount:'',
                wallet_id:1
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    //controlar el envio de los datos a la api
    handleSubmit(e){
        e.preventDefault()
        try {
            let config={
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.form)
            }
            //maneja la conexion con la api y posibilita
            let res =await fetch(`${url}/api/transfer`,config)
            let data = await res.json()
            this.setState({
                transfers:this.state.transfers.concat(data),
                money:this.state.money +(parseInt(data.amount))
            })
        } catch (error) {
            this.setState({
                error
            })
        }
    }

    //controlar los cambio del formulario
    handleChange(e){
        this.setState({
            form:{
                ...this.state.form,
                [e.taget.name]: e.taget.value
            }
        })

    }

    //Cargar los datos de la api
    async componentDidMount(){
        try{
            let res =await fetch(`${url}/api/wallet`)
            let data = await res.json()
            this.setState({
                money:data.money,
                transfers: data.transfers
            })
        } catch (error){
            this.setState({
                error
            })
        }
    }
    //cuerpo de la interface
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">I'm an example component!</div>
                        </div>
                    </div>
                    <div className="col-md-12-m-t-md">
                        <p className="title"> $ {this.state.money} </p>
                    </div>
                    <div className="col-md-12">
                        <TransferForm
                            form={this.state.form}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                        />
                    </div>
                </div>


                <div className="m-t-md">
                    <TranferList
                        transfers={this.state.transfers}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
