import {BsFilterRight} from 'react-icons/bs'
import {BiSearch} from 'react-icons/bi'

import './index.css'

const ProductsHeader = props => {
  const {onChangeSearchInputResults} = props
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const {sortbyOptions, activeOptionId} = props

  const onChangeSearchInput = event => {
    onChangeSearchInputResults(event.target.value)
  }

  return (
    <div className="products-header">
      <div>
        <input
          type="search"
          placeholder="search"
          className="search"
          onChange={onChangeSearchInput}
        />
        <BiSearch />
      </div>
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
