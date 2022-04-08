import axios from "axios";
import React, { Component } from "react";
import { CFormInput, CFormLabel,CFormCheck, CButton } from "@coreui/react";


export default class ItemPopup extends Component {

  constructor(props){
      super(props);
      
      this.state = {
          item_ID:"",
          name: "",
          image:"/default-item.png",
          category:"",
          description:"",
          price: "",
          quantity:"",
          fav:0,
          created: false
      }

      this.handleClick = this.handleClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.uploadImage = this.uploadImage.bind(this);
  } 

  // Handles the pop up toggle
  handleClick = () => {
    this.props.toggle();
  };

  handleNameChange = (e) => {
    this.setState({
        name: e.target.value
    });
  }

  uploadImage = async e=> {
    const files = e.target.files
    const data = new FormData
    data.append('file', files[0])
    data.append('upload_preset', '273-images')

    const res = await fetch(
        'http://api.cloudinary.com/v1_1/ddpcbqqmh/image/upload', 
        {
            method: 'POST',
            body: data
        }
    )

    const file = await res.json()

    this.setState({
      image:file.secure_url
    })

    console.log(file.secure_url)
  }

  handleCategoryChange = (e) => {
    this.setState({
        category: e.target.value
    });
  }

  handleDescriptionChange = (e) => {
    this.setState({
        description: e.target.value
    });
  }

  handlePriceChange = (e) => {
    this.setState({
        price: e.target.value
    });
  }

  handleQuantityChange = (e) => {
    this.setState({
        quantity: e.target.value
    });
  }

  handleSubmit = () => {

    var theRandomNumber = Math.floor(Math.random() * 99999) + 1;

    const data= {
        item_ID:theRandomNumber,
        shop: this.props.shop,
        shopname:this.props.name,
        name: this.state.name,
        image: this.state.image,
        category:this.state.category,
        description: this.state.description,
        price: this.state.price,
        quantity:this.state.quantity,
        fav:0

    }
    axios.post("http://localhost:3001/api/v1/items", data)
    .then(response => {
        console.log(response);
        if(response.status === 200){
            this.setState({
                created:true
            })
        }
        else{
            console.log(response);
        }
    })
  }




  render() {
    // let redirectVar = null;
    // if(this.state.created === true){
    //    redirectVar = <Navigate to= "/shop"/>
    // }
    return (
      <div className="modal11">
        {/* {redirectVar} */}
        <div className="modal_content11">
          <span className="close11" onClick={this.handleClick}>
            &times;
          </span>
          <form onSubmit={this.handleSubmit}>
            <h3>Add an Item!</h3>
            <h3>Enter the information for the Item</h3>
            <CFormLabel>
              Name:
              <CFormInput onChange={this.handleNameChange} type="text" name="name" placeholder="Item Name"/>
            </CFormLabel>
            <br />
            <CFormLabel>
              Image:
              <CFormInput onChange={this.uploadImage} type="file" name="image" placeholder="Item Image"/>
            </CFormLabel>
            <br />
            <CFormLabel>
              Category:  
              <CFormCheck onClick={this.handleCategoryChange} inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1" value="Clothing" label="Clothing"/>
              <CFormCheck onClick={this.handleCategoryChange} inline type="radio" name="inlineRadioOptions" id="inlineCheckbox2" value="Jewelry" label="Jewelry"/>
              <CFormCheck onClick={this.handleCategoryChange} inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1" value="option3" label="Entertainment"/>
              <CFormCheck onClick={this.handleCategoryChange} inline type="radio" name="inlineRadioOptions" id="inlineCheckbox2" value="Home Decor" label="Home Decor"/>
              <CFormCheck onClick={this.handleCategoryChange} inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1" value="Art" label="Art"/>

              <CFormInput onChange={this.handleCategoryChange} type="text" name="category" placeholder="Create your own category"/>
            </CFormLabel>
            <br />
            <CFormLabel>
              Description:
              <CFormInput onChange={this.handleDescriptionChange} className='item-description-input' type="text" name="description" placeholder="Enter Description "/>
            </CFormLabel>
            <br />
            <CFormLabel>
              Price:
              <CFormInput onChange={this.handlePriceChange} type="text" name="price" placeholder="Enter Price"/>
            </CFormLabel>
            <br />
            <CFormLabel>
              Quantity:
              <CFormInput onChange={this.handleQuantityChange} type="text" name="quantity" placeholder="Total Quantity"/>
            </CFormLabel>
            <br />
            <br />
            <CButton type="submit">Add Item</CButton>
          </form>
        </div>
      </div>
    );
  }
}
