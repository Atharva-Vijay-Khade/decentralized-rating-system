import React from "react";
import { Link } from "react-router-dom";
import "./css/productdetail.css";

import web3 from "../web3";
import { ratingAbi, ratingAddress } from "../Rating";

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
  
  constructor(props) {
    super(props);
    this.state = {
      temptestReviewList: [],
      count: 0,
      points: 0,
      ratingContract: undefined,
      productid: 0,
      currentproduct: null,
      productPrice: 0,
      account:"",
      createrating: {
        name: "",
        star: 0,
        review_text: "",
      },
    };
    this.state.productid = parseInt(props.match.params.id);
    this.state.currentproduct = props.productsList[this.state.productid];

  }

  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch);
  }

  async loadBlockchainData() {
    let accounts;
    try {
      accounts = await web3.eth.getAccounts();
    } catch (err) {
      this.state.ismetamaskavailable = false;
      console.log("please install metamask");
      return;
    }

    this.setState({ account: accounts[0] });

    const ratingContract = new web3.eth.Contract(ratingAbi, ratingAddress);
    this.setState({ ratingContract });
    console.log(ratingContract);

    

    const count = await ratingContract.methods.getCount(this.state.productid).call();
    let points = await ratingContract.methods.getPoints(this.state.productid).call();
    this.setState({count});
    this.setState({points});

    const temptestReviewList = await ratingContract.methods.getReviewList(this.state.productid).call();
    this.setState({temptestReviewList});
    console.log(temptestReviewList);

  }

  componentWillReceiveProps(nextProps) {
    this.state.productid = parseInt(nextProps.match.params.id);
    this.setState({
      currentproduct: nextProps.productsList[this.state.productid],
    });
  }


  async handleWriteReview(e) {
    e.preventDefault();
    await this.state.ratingContract.methods.createRating(this.state.productid,this.state.createrating.name,this.state.createrating.star,this.state.createrating.review_text).send({
      from: this.state.account,
    });
  }

  async handleBuy(Pprice) { 
    await this.state.ratingContract.methods.buyProduct(this.state.productid).send({
      from: this.state.account,
      value: Pprice*1000*1000000000000000000,
    });
  }

  render() {
    return (
      <>
        <Link to="/">
          <div className="productdetail__back-button">
            <i className="fa-solid fa-angles-left"></i>
          </div>
        </Link>
        <section className="productdetail__product-detail-area">
          <div className="productdetail__product-detail-area__container">
            <div className="productdetail__product-detail-area__container__image">
              <img src={this.state.currentproduct.ImageURL} alt="" />
            </div>
            <div className="productdetail__product-detail-area__container__products-text">
              <div className="productdetail__product-detail-area__container__products-text__text">
                <h3>{this.state.currentproduct.Name}</h3>
                <h2>{this.state.currentproduct.Price*1000} Matic</h2>
                <p>{this.state.currentproduct.Details}</p>
              </div>
              <div className="productdetail__product-detail-area__container__products-text__buy-btn">
                <button
                  className="btn btn-warning buy-button"
                  onClick={()=>this.handleBuy(this.state.currentproduct.Price)}
                >
                  <i className="fa-solid fa-cart-shopping"></i> Buy with Meta
                  Mask
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="productdetail__product-review-area">
          <div className="productdetail__product-review-area__container">
            <div className="productdetail__product-review-area__container__content">
              <div className="productdetail__product-review-area__container__content__reviews">
                <div className="productdetail__product-review-area__container__content__reviews__overallreview">
                  <div className="overallreview-container">
                    <h5>Overall</h5>
                    <h4>{this.state.count==0 ? 0 : this.state.points/this.state.count}</h4>
                    <h6>({this.state.count} Reviews)</h6>
                  </div>
                </div>
                <div className="productdetail__product-review-area__container__content__reviews__all-reviews">
                  {this.state.temptestReviewList.map((eachreview) => {
                    return (
                      <div
                        key={temptestReviewList.findIndex(
                          (x) => x == eachreview
                        )}
                        className="productdetail__product-review-area__container__content__reviews__all-reviews__review-card"
                      >
                        <div className="review-card__name_details">
                          <div className="review-card__name_details__image">
                            <img
                              src={`https://avatars.dicebear.com/api/human/${eachreview.date}.svg`}
                            />
                          </div>
                          <div className="review-card__name_details__name">
                            <h2>{eachreview.name}</h2>
                            <span>
                              {this.setStars(eachreview.star)}
                              <span className="review-card__name_details__name__date">
                                {new Date(parseInt(eachreview.time)*1000)
                                  .toString()
                                  .substr(0, 16)}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="review-card__review-text">
                          <p>{eachreview.review}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="productdetail__product-review-area__container__content__create-review-box">
                <h4>Add a Review</h4>
                <span>
                  <h5>
                    Your Rating:
                    <input
                      type="text"
                      onChange={(e) => {
                        if (parseFloat(e.target.value) > 5) {
                          e.target.value = 5;
                        }
                        this.handleInput(e.target.value, "stars");
                      }}
                      style={{ width: "50px" }}
                    />
                    {this.setStars(
                      this.state.createrating.star,
                      "yellow set-stars"
                    )}
                  </h5>
                </span>
                <form action="#/" className="form-contact form-review mt-3">
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      required=""
                      onChange={(e) => this.handleInput(e.target.value, "name")}
                    />
                  </div>
            
                  <div className="form-group">
                    <textarea
                      className="form-control different-control w-100"
                      name="textarea"
                      id="textarea"
                      cols="30"
                      rows="5"
                      placeholder="Enter Message"
                      onChange={(e) =>
                        this.handleInput(e.target.value, "review-text")
                      }
                    ></textarea>
                  </div>
                  <div className="form-group text-center text-md-right mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={(e)=>this.handleWriteReview(e)}
                    >
                      <i className="fa-solid fa-pen-nib"></i> | Write my Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  handleInput(value, type) {
    switch (type) {
      case "name":
        this.state.createrating.name = value;
        break;
      case "review-text":
        this.state.createrating.review_text = value;
        break;
      case "stars":
        this.setState({
          createrating: { ...this.createrating, star: parseFloat(value) },
        });
        break;
    }
  }
  setStars(rate, extraclass = "yellow") {
    if (rate >= 5) rate = 5;
    let classes = [];
    while (rate > 0.9) {
      rate -= 1;
      classes.push("fa-solid fa-star " + extraclass);
    }
    // if (classes.length < 5 && rate * 10 > 0)
    //   classes.push("fa-solid fa-star-half-stroke " + extraclass);

    while (classes.length < 5) classes.push("fa-regular fa-star " + extraclass);
    let key = 0;
    return classes.map((eachstar) => (
      <i
        key={(key += 1)}
        className={eachstar}
        onClick={() => {
          // Buggy :'|
          // this.setState({
          //   createrating: { ...this.createrating, star: key },
          // });
        }}
      ></i>
    ));
  }
}

export default ProductDetail;
