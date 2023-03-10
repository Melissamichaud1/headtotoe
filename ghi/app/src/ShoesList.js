import React, { useState, useEffect } from 'react';

// async function deleteShoe(id) {
//   console.log(id)
//   const url = `http://localhost:8080/api/shoes/${id}/`;
//   const response = await fetch (url,{method: "DELETE"})
//   const responseJSON = await response.json()
  // setShoes(shoes.filter(function(shoe){return shoe.id !== id}))
  // };

function ShoesList() {

  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    async function loadShoes() {
      const response = await fetch("http://localhost:8080/api/shoes/");
      if (response.ok) {
        const data = await response.json();
        setShoes(data.shoes);
      } else {
        console.error(response);
      }
    }
    loadShoes();
  },[])

  async function deleteShoe(id) {
    console.log(id)
    const url = `http://localhost:8080/api/shoes/${id}/`;
    const response = await fetch (url,{method: "DELETE"})
    const responseJSON = await response.json()
    setShoes(shoes.filter(function(shoe){return shoe.id !== id}))
    };


    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Color</th>
            <th>Bin</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {shoes?.map(shoe => {
            return (
              <tr key={shoe.id}>
                <td>{ shoe.manufacturer }</td>
                <td>{ shoe.model_name }</td>
                <td><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill={ shoe.color } className="bi bi-square-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/></svg></td>
                <td>{ shoe.bin.closet_name }</td>
                <td><img src={ shoe.picture_url } width="80" height="80"/></td>
                <td><button onClick={() => deleteShoe(shoe.id)}>Delete Shoe</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  export default ShoesList;
