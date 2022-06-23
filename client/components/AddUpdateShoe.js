import axios from 'axios';
import React, { useState, useEffect } from 'react';

const addShoeForm = (shoeData) => {
  //console.log(shoeData.shoeData);
  const [name, setName] = useState(shoeData.shoeData.name || '');
  const [description, setDescription] = useState(
    shoeData.shoeData.description || ''
  );
  const [imageUrl, setImageUrl] = useState(shoeData.shoeData.imageUrl || '');
  const [price, setPrice] = useState(shoeData.shoeData.price || 0);
  // let [dbSuccess, setDbSuccess] = useState(true);

  const addEditShoeHandler = async () => {
    let history = useHistory();
    const newShoe = {
      name: name,
      description: description,
      imageUrl: imageUrl,
      price: price,
    };
    //UPDATE TO EXISTING SHOE
    if (shoeData.shoeData.id) {
      axios.put(`/api/shoes/${shoeData.shoeData.id}/update`, newShoe, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
      //ADD NEW SHOE
    } else {
      try {
        const res = await axios.post(`/api/shoes/`, {
          authorization: window.localStorage.getItem('token'),
          newShoe,
        });

        // console.log('RESRESRESRESRES', res.status);
        // if (res.status === 201) {
        //   console.log('if statement for success has triggered');
        //   setDbSuccess(!dbSuccess);
        //   console.log(dbSuccess);
        // }
        // console.log('DBSUCCESS', dbSuccess);
        //ADD VALIDATOR TO PRODUCT MODEL TO PREVENT DATA CREATION WITH BAD VALUES LIKE STRING IN PRICE, VALIDATE ON USER END PRIOR TO SENDING TOO
        //setShoes((shoes) => shoes.filter((shoe) => shoe.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
    history.push('/users');
  };

  return (
    <>
      <small htmlFor="name"> Shoe Name: </small>
      <input
        type="text"
        placeholder="Shoe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <small htmlFor="description"> Description: </small>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <small htmlFor="ImageURL"> Image URL: </small>
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <small htmlFor="price"> Price: </small>
      <input
        type="float"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addEditShoeHandler}>Submit</button>
    </>
  );
};

export default addShoeForm;
