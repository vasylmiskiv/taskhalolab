import { useEffect, useState } from "react";
import { Good } from "../Good/Good";
import axios from "axios";
import "./Goods.scss";
import { BuyModal } from "../BuyModal/BuyModal";

export const Goods = () => {
  const [goods, setGoods] = useState<Good[] | any>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [buyModal, setBuyModal] = useState<boolean>(false);
  const [votedGood, setVotedGood] = useState<Good | undefined>();

  useEffect(() => {
    axios
      .get(`https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e`)
      .then((res) => {
        setGoods(res.data);
        setLoader(false);
      });
  }, []);

  const onBuy = (good: Good) => {
    setVotedGood(good);
    setBuyModal(true);
  };

  const onBuyCheapest = () => {
    let min = goods[0].price;
    for (let good of goods) {
      if (good.price < min) {
        min = good.price;
      }
    }
    setVotedGood(goods.find((good: Good) => good.price === min));
    setBuyModal(true);
  };

  const onCloseModal = () => setBuyModal(false);

  return (
    <>
      <div className="container">
        {loader ? (
          <h2>Loader</h2>
        ) : (
          <div className="goods">
            <ul className="goods-list">
              {goods.map((good: Good, i: number) => (
                <li className="goods-item" key={i}>
                  <Good good={good} buy={onBuy} />
                </li>
              ))}
            </ul>
            <button
              className="goods__buy-cheapest"
              onClick={() => onBuyCheapest()}
            >
              Buy cheapest
            </button>
          </div>
        )}
      </div>
      {buyModal && (
        <BuyModal
          votedGood={votedGood}
          closeModal={onCloseModal}
          buyModal={buyModal}
        />
      )}
    </>
  );
};
