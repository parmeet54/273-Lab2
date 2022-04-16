import { React, Component } from "react"
import CartItem from "./CartItem";
import {CRow} from '@coreui/react'

class CartList extends Component {
    renderTile = (current_item) => {
        return (
            <CRow>
                <CartItem item={current_item}/>
            </CRow>
        )
    }

    render() {
        let tiles = [];
        for (let i = 0; i < this.props.items.length; i++) {
            const current_item = this.props.items[i];
            tiles.push(this.renderTile(current_item));
        }
        return tiles;    }
}

CartList.defaultProps = {
    items: []
  };

export default CartList;