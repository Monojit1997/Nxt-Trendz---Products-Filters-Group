import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    titleSearch: '',
    category: '',
    rating: '',
    isApiFailed: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  onSelectedCatagory = category => {
    this.setState({category}, this.getProducts)
  }

  onSelectedRating = rating => {
    this.setState({rating}, this.getProducts)
  }

  onChangeSearchInputResults = value => {
    this.setState({titleSearch: value}, this.getProducts)
  }

  onClearFilter = () => {
    this.setState(
      {
        titleSearch: '',
        category: '',
        rating: '',
        activeOptionId: sortbyOptions[0].optionId,
      },
      this.getProducts,
    )
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, rating, titleSearch} = this.state
    console.log(activeOptionId, category, rating, titleSearch)
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({isApiFailed: true})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList} = this.state

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        {productsList.length < 1 ? (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              alt="no products"
            />
            <h1>No Products Found</h1>
            <p>We could not find any products. Try another filters.</p>
          </div>
        ) : (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {isLoading, category, activeOptionId, isApiFailed} = this.state
    console.log(category)

    return (
      <div>
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          onChangeSearchInputResults={this.onChangeSearchInputResults}
        />
        <div className="all-products-section">
          <FiltersGroup
            categoryOptions={categoryOptions}
            ratingsList={ratingsList}
            onSelectedCatagory={this.onSelectedCatagory}
            onSelectedRating={this.onSelectedRating}
            onClearFilter={this.onClearFilter}
          />
          <div>
            {isApiFailed ? (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
                  alt="products failure"
                />
                <h1>Oops! Something Went Wrong</h1>
                <p>
                  We have some trouble processing your request. Please try
                  again.
                </p>
              </div>
            ) : (
              <div>
                {isLoading ? this.renderLoader() : this.renderProductsList()}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default AllProductsSection
