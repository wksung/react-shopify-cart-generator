import React from 'react';
import '../css/products.css';

class Products extends React.Component{

    state = {
        cart: [],
        added_button: false
    }

    componentDidUpdate(){
        let selector = document.querySelectorAll(".product-container__item-selector__select.select");
        if(this.props.cart_remove){
            for(let i = 0; i < selector.length; i++){
                selector[i].value = 1;
            };
        };
    };

    submitForm = (e) => {
        e.preventDefault();
        if (this.refs.select_qty) {
            const id = this.props.product.variants[0].id;
            const qty = this.refs.select_qty.value;
            this.props.get_cart_data(id, qty);
        };
    };

    render(){
        return (
            <div className="d-flex product-container__item">
                <img className="mb-4" src={ this.props.product.images[0].src }></img>
                <h2 className="product-container__item-title">
                    <span className="font-weight-bold">Name:</span> { this.props.product.title }
                </h2>
                <p className="mb-2">
                    <span className="font-weight-bold">Price:</span> { this.props.product.variants[0].price }
                </p>
                <p className="product-container__item-last-child">
                    <span className="font-weight-bold">Description:</span> { this.props.product.body_html }
                </p>
                <form className="d-flex product-container__item-selector" onSubmit={ (e) => this.submitForm(e) }>
                    <select ref="select_qty" className="form-control product-container__item-selector__select select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {
                        this.props.cart_remove ?
                            <input className="btn btn-primary product-container__item-selector__select button" type="Submit" defaultValue="Added" disabled></input> :
                            <input className="btn btn-primary product-container__item-selector__select button" type="Submit" defaultValue="Add"></input>
                    }
                </form>
            </div>
        );
    };
};

export default Products;