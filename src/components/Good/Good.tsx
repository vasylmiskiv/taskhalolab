import "./Good.scss";

export const Good = ({ good, buy }: any) => {
  return (
    <div className="good-card">
      <div className="good-card__category">{good.category}</div>
      <div className="good-card__name">{good.name}</div>
      <div className="good-card__price">
        <div>
          <span className="good-card__dollar-sign">$</span>
          {good.price}
        </div>
        <button
          className="good-card__buy"
          type="button"
          onClick={() => buy(good)}
        >
          Buy
        </button>
      </div>
    </div>
  );
};
