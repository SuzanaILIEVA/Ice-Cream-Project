import React from "react";

const Card = ({ item, addToBasket, removeFromBasket, amount }) => {
  // console.log(item);
  return (
    <div
      style={{ width: "200px" }}
      className="border rounded p-3 d-flex flex-column align-items-center gap-1"
    >
      <img src={item.imagePath} alt="cesit-resim" height={100} />
      <span>{item.name}</span>

      <div className="d-flex gap-2 align-items-center mt-4">
        <button
          disabled={amount === 0}
          onClick={() => removeFromBasket(item.id)}
          className="btn btn-outline-danger btn-sm"
        >
          Azalt
        </button>
        <span data-testid="amount" className="fs-4">{amount}</span>
        <button
          onClick={() => addToBasket(item)}
          className="btn btn-outline-success btn-sm "
        >
          Ekle
        </button>
      </div>
    </div>
  );
};

export default Card;
