function Search({
  search,
  setSearch,
  cityFilter,
  setCityFilter,
  stateFilter,
  setStateFilter,
  zipFilter,
  setZipFilter,
  clearFilters,
}) {
  return (
    <div className="container mb-3 d-flex">
      <form onSubmit={(e) => e.preventDefault()}>
        <h5>Search & Filters</h5>
        <div className="row g-2 mb-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name, Email, Phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="State"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Zipcode"
              value={zipFilter}
              onChange={(e) => setZipFilter(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-secondary me-2" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
