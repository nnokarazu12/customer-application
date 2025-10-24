import { useState, useEffect } from "react";
import CustomerList from "./CustomerList";
import Table from "./Table";
import axios from "axios";
import CustomerForm from "./CustomerForm";
import Search from "./Search";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [zipFilter, setZipFilter] = useState("");

  //Get list of all customers
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/customer");
      setCustomers(response.data);
      setFilteredCustomers(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCustomerAdded = async () => {
    await fetchCustomers();
  };

  //Filter out customer from list
  const handleCustomerDeleted = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setFilteredCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  // Filter logic
  useEffect(() => {
    let temp = [...customers];

    if (search) {
      const lowerSearch = search.toLowerCase();
      temp = temp.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(lowerSearch) ||
          c.email.toLowerCase().includes(lowerSearch) ||
          c.phoneNumber.includes(lowerSearch)
      );
    }

    if (cityFilter) {
      temp = temp.filter((c) =>
        c.addresses.some((a) =>
          a.city.toLowerCase().includes(cityFilter.toLowerCase())
        )
      );
    }

    if (stateFilter) {
      temp = temp.filter((c) =>
        c.addresses.some((a) =>
          a.state.toLowerCase().includes(stateFilter.toLowerCase())
        )
      );
    }

    if (zipFilter) {
      const zip = zipFilter.trim();
      temp = temp.filter((c) =>
        c.addresses?.some(
          (a) => a.zipcode != null && String(a.zipcode).includes(zip)
        )
      );
    }

    setFilteredCustomers(temp);
  }, [search, cityFilter, stateFilter, zipFilter, customers]);

  const clearFilters = () => {
    setSearch("");
    setCityFilter("");
    setStateFilter("");
    setZipFilter("");
  };

  if (loading) return <p>Loading customers...</p>;
  return (
    <>
      <div
        className="container"
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "50px",
          color: "#000080",
        }}
      >
        <h3>Customer Application</h3>
        <div>
          View the current list of customers and update customer information
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <CustomerForm onCustomerAdded={handleCustomerAdded}></CustomerForm>
      </div>
      <br />

      <div className="container d-flex justify-content-center align-items-center">
        <CustomerList
          data={filteredCustomers}
          onCustomerDeleted={handleCustomerDeleted}
        ></CustomerList>
      </div>
      <br />

      <Search
        search={search}
        setSearch={setSearch}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        zipFilter={zipFilter}
        setZipFilter={setZipFilter}
        clearFilters={clearFilters}
      />

      <div className="container d-flex justify-content-center align-items-center">
        <Table data={filteredCustomers}></Table>
      </div>
    </>
  );
}

export default Dashboard;
