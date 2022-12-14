import "./App.css";
import { Fragment, useState, useEffect } from "react";
import {
  Stack, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  Typography, TextField, TextareaAutosize, IconButton
} from "@mui/material";
import useStyles from "./styles";
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function App(props) {
  let classes = useStyles(props);
  // loading state to wait until getting existing products from local storage
  let [loading,setLoading] = useState(true)
  // state for info of product
  let [infoProduct, setInfoProduct] = useState({
    nameProduct: '', priceProduct: '',
    categoryProduct: '', descriptionProduct: ''});
  // state for products
  let [allProduct, setAllProduct] = useState([]);
  // states related to input search
  let [inputSearch, setInputSearch] = useState("");
  let [searchedItems, setSearchedItems] = useState([])
  // state for show/hide update button
  let [showUpdateProduct, setShowUpdateProduct] = useState(false)
  //destructing product info
  let { nameProduct, priceProduct, categoryProduct, descriptionProduct } = infoProduct

  let clearInputs = () => {
    setInfoProduct({
      nameProduct: "", priceProduct: "", categoryProduct: "", descriptionProduct: ""
    })
  }

  let changehandler = (e) => {
    setInfoProduct({ ...infoProduct, [e.target.name]: e.target.value })}

  let add = (e) => {
    if (nameProduct === "" && priceProduct === "" && categoryProduct === "" && descriptionProduct == "") {
      alert("Please fill all inputs")
    }
    else {
      setInfoProduct({ ...infoProduct, [e.target.name]: e.target.value })
      setAllProduct([...allProduct, infoProduct])
      clearInputs();
    }
  }
// to get the products from local storage (like save settings) when the component is mounted
  useEffect(() => {
    if (localStorage.getItem("products")) {
      setAllProduct(JSON.parse(localStorage.getItem("products")))
    }
    setLoading(false)
  }, [])
// to set products in local storage after every change in allproduct
  useEffect(() => {
    if (allProduct.length > 0) {
      localStorage.setItem("products", JSON.stringify(allProduct))
    }
  }, [allProduct])
  useEffect(() => {
    if(inputSearch===""){
      setAllProduct([...JSON.parse(localStorage.getItem("products"))])
    }
    else{
      let items = allProduct.filter(ele => { return ele.nameProduct.toLowerCase().includes(inputSearch.toLowerCase()) })
      if(items.length > 0){ setSearchedItems(items) ;}
      else{ setSearchedItems([]);setAllProduct([])}
    }
  },[inputSearch])
  let search = (e) => {
    setInputSearch(e.target.value)
  }

  let deleteFunc = (index) => {
    if (inputSearch.length > 0) {
      alert("Please remove text from search input")
    }
    else {
      let newArr = allProduct.slice(0, index).concat(allProduct.slice(index + 1))
      setAllProduct(newArr)
    }
  }
  

  let getInfoAboutItem = (index) => {
    // show update button
    setShowUpdateProduct(true)
    let items=JSON.parse(localStorage.getItem("products"))
    let item=items[index]
    setInfoProduct({...infoProduct,
      nameProduct: item.nameProduct, priceProduct: item.priceProduct, categoryProduct: item.categoryProduct, descriptionProduct:item.descriptionProduct
    })
    // to remove the item which we need to update from products.
    let newArr = allProduct.slice(0, index).concat(allProduct.slice(index + 1))
    setAllProduct(newArr)
}

  let Update = (e) => {
    setShowUpdateProduct(false)
    setInfoProduct({...infoProduct,[e.target.name]:e.target.value})
    setAllProduct([...allProduct,infoProduct])
    clearInputs()
  }
  if(loading){return <div>loading.........</div>}
  return (
    <Fragment>
      <Box className={classes.box} >
        <Stack direction="column" gap={6} className={`${classes.container}`} component="form" onSubmit={(e) => e.preventDefault()}>
          <Typography
            variant="h4"
            component="div"
            className={`${classes.test}`}
            style={{
              textAlign: "center",
            }}
          >
            CRUDS React.JS
          </Typography>
          <TextField
            label="Product Name"
            variant="filled"
            type="text"

            className={classes.productNameinput}
            value={nameProduct} onChange={(e) => changehandler(e)}
            name="nameProduct"
          />
          <TextField
            value={priceProduct}
            onChange={(e) => changehandler(e)}

            label="Product Price"
            variant="filled"
            type="number"
            className={classes.ProductPriceInput}
            name="priceProduct"
          />
          <TextField
            value={categoryProduct}
            onChange={(e) => changehandler(e)}
            label="Product Category"
            variant="filled"
            type="text"
            className={classes.ProductCategoryInput}
            name="categoryProduct"
          />
          <TextareaAutosize
            value={descriptionProduct}
            onChange={(e) => changehandler(e)}
            className={`${classes.ProductDescriptionInput}`}
            placeholder="product Description"
            name="descriptionProduct"
          />
          <div style={{ display: 'flex', alignItems: "center", justifyContent: "flex-start" }}>
            <Button
              variant="contained"
              size="large"
              className={`${classes.btn}`}
              type="submit"
              onClick={(e) => add(e)}
            >
              <AddIcon />
              Add Product
            </Button>
            {showUpdateProduct && <Button
              variant="contained"
              size="large"
              className={`${classes.btn}`}
              type="submit"
              onClick={(e) => Update(e)}
            >
              <UpdateIcon />
              Update
            </Button>}
          </div>
          <TextField
            variant="filled"
            type="text"
            value={inputSearch}
            className={`${classes.input} ${classes.search}`}
            placeholder="Search Product Name"
            onChange={(e) => search(e)}
          />
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} size="small" >
              <TableHead className={`${classes.tableHeader}`}>
                <TableRow>
                  <TableCell align="center">Index</TableCell>
                  <TableCell align="center">Product Name</TableCell>
                  <TableCell align="center">Product Price</TableCell>
                  <TableCell align="center">Product Category</TableCell>
                  <TableCell align="center">Product Description</TableCell>
                  <TableCell align="center">Update</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchedItems.length > 0 ? searchedItems.map((product, id) => {
                  let { nameProduct, priceProduct, categoryProduct, descriptionProduct } = product;
                  return (
                    <TableRow key={id} ><TableCell align="center">{id + 1}</TableCell>
                      <TableCell align="center">{nameProduct}</TableCell>
                      <TableCell align="center">{priceProduct}</TableCell>
                      <TableCell align="center">{categoryProduct}</TableCell>
                      <TableCell align="center">{descriptionProduct}</TableCell>
                      <TableCell align="center"><IconButton color="success" size="small" onClick={() => getInfoAboutItem(id)}><UpdateIcon />Update
                      </IconButton></TableCell>
                      <TableCell align="center"><IconButton color="success" size="small" onClick={() => { deleteFunc(id) }} ><DeleteIcon />Delete
                      </IconButton> </TableCell></TableRow>)
                }) : allProduct.map((product, id) => {
                  let { nameProduct, priceProduct, categoryProduct, descriptionProduct } = product;
                  return (
                    <TableRow key={id} ><TableCell align="center">{id + 1}</TableCell>
                      <TableCell align="center">{nameProduct}</TableCell>
                      <TableCell align="center">{priceProduct}</TableCell>
                      <TableCell align="center">{categoryProduct}</TableCell>
                      <TableCell align="center">{descriptionProduct}</TableCell>
                      <TableCell align="center"><IconButton color="success" onClick={() => getInfoAboutItem(id)} size="small"><UpdateIcon />Update
                      </IconButton></TableCell>
                      <TableCell align="center"><IconButton color="success" size="small" onClick={() => deleteFunc(id)}><DeleteIcon />delete
                      </IconButton> </TableCell></TableRow>)
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack></Box></Fragment>
  );
}

export default App;
