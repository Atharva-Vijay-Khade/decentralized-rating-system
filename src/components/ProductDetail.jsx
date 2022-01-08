import React from "react";
import "./css/productdetail.css";

let temptestReviewList = [
  {
    name: "Firefox",
    date: Date.now(),
    star: 4.5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus in hendrerit gravida rutrum quisque. Tristique senectus et netus et malesuada fames. Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Duis ultricies lacus sed turpis tincidunt. Cras semper auctor neque vitae tempus quam pellentesque. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Interdum velit laoreet id donec ultrices tincidunt. Nibh ipsum consequat nisl vel pretium. Odio morbi quis commodo odio aenean sed adipiscing diam donec.",
  },
  {
    name: "Chrome",
    date: Date.now(),
    star: 2.5,
    review:
      "Aliquet enim tortor at auctor urna. Commodo sed egestas egestas fringilla. Leo a diam sollicitudin tempor. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Id consectetur purus ut faucibus pulvinar elementum integer. Risus viverra adipiscing at in tellus integer. Pellentesque id nibh tortor id. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Sem fringilla ut morbi tincidunt. Nulla pharetra diam sit amet.",
  },
];

class ProductDetail extends React.Component {
  state = {
    productid: 0,
    currentproduct: null,
  };
  render() {
    return (
      <>
        <section className="productdetail__product-detail-area">
          <div className="productdetail__product-detail-area__container">
            <div className="productdetail__product-detail-area__container__image">
              <img
                src="https://i.picsum.photos/id/616/1000/1000.jpg?hmac=0j5j2ct7vJiuBg7Ytve-OR8m13xU_myc5a1Ex_3Egsk"
                alt=""
              />
            </div>
            <div className="productdetail__product-detail-area__container__products-text">
              <div className="productdetail__product-detail-area__container__products-text__text">
                <h3>Name of product</h3>
                <h2>$1000.00</h2>
                <p>
                  Mill Oil is an innovative oil filled radiator with the most
                  modern technology. If you are looking for something that can
                  make your interior look awesome, and at the same time give you
                  the pleasant warm feeling during the winter.
                </p>
              </div>
              <div className="productdetail__product-detail-area__container__products-text__buy-btn">
                <button className="btn btn-warning buy-button" href="#">
                  <i className="fa-solid fa-cart-shopping"></i> Buy with Meta
                  Mask
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="productdetail__product-review-area">Review</section>
      </>
    );
  }
}

export default ProductDetail;