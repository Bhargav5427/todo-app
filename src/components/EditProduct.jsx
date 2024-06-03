// import React, { useState, useEffect } from 'react';
// import {
//     Container, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
// } from '@mui/material';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const EditProduct = ({ product, onClose, onSave }) => {
//     const [models, setModels] = useState([]);
//     const [selectedModel, setSelectedModel] = useState(product.model);
//     const [name, setName] = useState(product.name);
//     const [price, setPrice] = useState(product.price);
//     const [brand, setBrand] = useState(product.brand);
//     const [category, setCategory] = useState(product.category);
//     const [releaseYear, setReleaseYear] = useState(product.releaseYear);
//     const [features, setFeatures] = useState(product.features);

//     useEffect(() => {
//         const fetchModels = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3010/models');
//                 if (response.data) {
//                     setModels(response.data);
//                 } else {
//                     console.error('No models data found in the response:');
//                 }
//             } catch (error) {
//                 console.error('Error fetching models:', error);
//             }
//         };

//         fetchModels();
//     }, []);

//     useEffect(() => {
//         if (selectedModel) {
//             const selectedModelDetails = models.find(model => model.model === selectedModel);
//             if (selectedModelDetails) {
//                 setBrand(selectedModelDetails.brand);
//                 setCategory(selectedModelDetails.category);
//             } else {
//                 setBrand('');
//                 setCategory('');
//             }
//         } else {
//             setBrand('');
//             setCategory('');
//         }
//     }, [selectedModel, models]);

//     const handleSaveProduct = async () => {
//         const updatedProduct = {
//             ...product,
//             name,
//             price: parseFloat(price),
//             model: selectedModel,
//             brand,
//             category,
//             releaseYear: parseInt(releaseYear, 10),
//             features: features.filter(feature => feature.trim() !== ''), // Remove empty features
//         };

//         try {
//             await axios.put("http://localhost:3010/products/${product.id}", updatedProduct);
//             onSave(updatedProduct);
//             onClose();
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success',
//                 text: 'Product updated successfully',
//             });
//         } catch (error) {
//             console.error('Error updating product:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Error updating product',
//             });
//         }
//     };    

//     const handleAddFeatureField = () => {
//         setFeatures([...features, '']); // Add a new empty string 
//     };

//     const handleFeatureChange = (index, value) => {
//         const updatedFeatures = [...features];
//         updatedFeatures[index] = value;
//         setFeatures(updatedFeatures);
//     };

//     return (
//         <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm" >
//             <DialogTitle>Edit Product</DialogTitle>
//             <DialogContent>
//                 <TextField
//                     select
//                     label="Select Model"
//                     value={selectedModel}
//                     onChange={(e) => setSelectedModel(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     variant="outlined"
//                 >
//                     {models.map((model) => (
//                         <MenuItem key={model.id} value={model.model}>
//                             {model.model}
//                         </MenuItem>
//                     ))}
//                 </TextField>

//                 <TextField
//                     label="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     variant="outlined"
//                 />
//                 <TextField
//                     label="Price"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     variant="outlined"
//                     type="number"
//                 />
//                 <TextField
//                     label="Brand"
//                     value={brand}
//                     onChange={(e) => setBrand(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     variant="outlined"
//                     disabled
//                 />
//                 <TextField
//                     label="Category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     variant="outlined"
//                     disabled
//                 />
//                 <TextField
//                     label="Release Year"
//                     value={releaseYear}
//                     onChange={(e) => setReleaseYear(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                     variant="outlined"
//                     type="number"
//                 />
//                 {features.map((feature, index) => (
//                     <TextField
//                         key={index}
//                         label={Feature ${index + 1}}
//                         value={feature}
//                         onChange={(e) => handleFeatureChange(index, e.target.value)}
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                     />
//                 ))}
//                 <Button onClick={handleAddFeatureField} color="primary" variant="outlined">
//                     Add Another Feature
//                 </Button>
//             </DialogContent>
//            <DialogActions>
//                 <Button onClick={onClose} color="primary">
//                     Cancel
//                 </Button>
//                 <Button onClick={handleSaveProduct} color="primary" variant="contained">
//                     Save
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default EditProduct;