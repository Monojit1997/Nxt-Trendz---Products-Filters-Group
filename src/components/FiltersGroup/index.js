import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    onSelectedCatagory,
    onSelectedRating,
    onClearFilter,
  } = props

  const selectedRating = event => {
    onSelectedRating(event.target.value)
  }

  const selectedCatagory = event => {
    onSelectedCatagory(event.target.value)
  }

  const clearFilter = event => {
    onClearFilter(event.target.value)
  }

  return (
    <div className="filters-group-container">
      <h1>Category</h1>
      <div className="unorder-filter-list">
        {categoryOptions.map(eachItem => (
          <button
            type="button"
            className="catagory-button"
            key={eachItem.categoryId}
            onClick={selectedCatagory}
            value={eachItem.categoryId}
          >
            {eachItem.name}
          </button>
        ))}
      </div>
      <h1>Rating</h1>
      <div className="unorder-filter-list">
        {ratingsList.map(eachItem => (
          <button
            type="button"
            className="rating-button"
            key={eachItem.ratingId}
            onClick={selectedRating}
            value={eachItem.ratingId}
          >
            <img
              src={eachItem.imageUrl}
              alt={`rating ${eachItem.ratingId}`}
              className="rating-style"
            />
            <p>& up</p>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="clear-button"
        value="clear"
        onClick={clearFilter}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
