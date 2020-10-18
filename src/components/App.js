import React from 'react';
import get_shopify_data from '../api/get_shopify_data';
import Products from './Products';
import '../css/app.css';

class App extends React.Component{
    state = {
        domain: '',
        products: [],
        cart: [],
        noBtnActive: false,
        cart_remove: false,
        cart_link: ''
    }

    componentDidMount(){
        this.shopify_api_shops();
        this.shopify_api_products();
    };

    shopify_api_shops = async () => {
        const response = await get_shopify_data.get("/get_shopify_url");
        console.log(response);
        this.setState({
            domain: response.data.shop.domain
        });
    }

    shopify_api_products = async () => {
        const response = await get_shopify_data.get("/get_products");
        this.setState({
            products: response.data.products
        }, () => {
            console.log(this.state.products);
        });
    };
    
    get_cart_data = (id, qty) => {
        this.setState({
            cart: this.state.cart.concat({id, qty})
        }, () => {
            if(this.state.cart.length > 0){
                this.setState({
                    noBtnActive: true
                });
            };
            console.log(this.state);
        });
    };

    create_cart_link = () => {
        const queryLink = this.state.cart.map((product) => {
            return product.id + ":" + product.qty
        }).join(",");
        this.setState({
            cart_link: `https://${this.state.domain}/cart/${ queryLink }`,
            cart_remove: true
        });
    };

    clear_cart_link = () => {
        this.setState({
            cart: [],
            cart_link: '',
            noBtnActive: false,
            cart_remove: false
        });
    };

    render(){
        const list_shopify_products = this.state.products.map((product) => {
            return (
                <Products product={ product } 
                          key={ product.id } 
                          get_cart_data = { this.get_cart_data }
                          cart_remove = { this.state.cart_remove }>
                </Products>
            );
        });

        return (
            <div className="container mt-4 mt-lg-5">
                <div className="row">
                    <div className="col-12">
                        {
                            this.state.products[0] ?
                            <h1 className="h3 mb-0">{ this.state.products[0].vendor }'s Cart Generator</h1> :
                            <p>Loading...</p>
                        }
                    <hr></hr>
                    </div>
                    <div className="col-12">
                        <div className="product-container d-flex">
                            { list_shopify_products }  
                        </div>
                    </div>
                    <div className="col-12">
                        { 
                            this.state.noBtnActive ? 
                            <button className="btn btn-success w-100 mb-3" onClick={ () => this.create_cart_link() }>Create Cart Link</button> : 
                            '' 
                        }
                        {
                            this.state.cart_link ?
                            <button className="btn btn-danger w-100 mb-4" onClick={ () => this.clear_cart_link() }>Clear Cart</button> : 
                            ''
                        }
                    </div>
                    <div className="col-12 mb-4">
                        {
                            this.state.cart_link ?
                            <a className="small" href={ this.state.cart_link } target="_blank" rel="noopener noreferrer">{ this.state.cart_link }</a> :
                            ''
                        }
                    </div>
                </div>
            </div>
        )
    };
};

export default App;