import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card";

const Scoops = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/scoops").then((res) => setData(res.data));
  }, []);

  // Sepete ekle
  const addToBasket = (item) => {
    // sepette bu eleman var mi kontrol et
    const found = basket.find((i) => i.id === item.id);

    if (found) {
      // Guncel nesneyi olustur
      const updated = { ...found, amount: found.amount + 1 };

      // diziyi guncelle
      const temp = basket.map((i) => (i.id === found.id ? updated : i));

      // state'i guncelle
      setBasket(temp);
    } else {
      // yoksa sepete ekle
      setBasket([...basket, { ...item, amount: 1 }]);
    }
  };
 

  //sepetten cikar
  const removeFromBasket = (id) => {
    // elemani sepette bul
    const found = basket.find((i) => i.id === id);

    if (found.amount > 1) {
      //guncel nesneyi olustur
      const updated = { ...found, amount: found.amount - 1 };

      //diziyi guncelle
      const temp = basket.map((i) => (i.id === found.id ? updated : i));

      //state'i guncelle
      setBasket(temp);
    } else {
      //sepetten kaldir
      setBasket(basket.filter((i) => i.id !== id));
    }
  };
  // console.log(basket);

  // TOPLAM FIYAT HESAPLAMA
  const total = basket.reduce((total , i )=> total + i.amount * 20 , 0 )




  return (
    <div>
      <h1>Dondurma Çeşitleri</h1>

      <p>
        {" "}
        Tanesi <span className="text-success">20 </span>&#8378;
      </p>

      <h3>
        Toplam Ücret <span data-testid="total" className="text-success">{total}</span>&#8378;
      </h3>

      <div className="p-3 row gap-5 mt-4 justify-content-between">
        {data.map((i) => {
            // ekrana basilacak elemani sepette bul
            const found = basket.find((item) => item.id === i.id)
         return (
            <Card
            amount={found?.amount || 0}
            removeFromBasket={removeFromBasket}
            addToBasket={addToBasket}
            item={i}
            key={i.id}
          />
         )
        })}
      </div>
    </div>
  );
};

export default Scoops;
