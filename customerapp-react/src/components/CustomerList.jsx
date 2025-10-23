import axios from "axios";
import { useState, useEffect } from "react";

function CustomerList({ data, onCustomerDeleted }) {
  const [editIndex, setEditIndex] = useState(null); // index of customer being edited
  const [localData, setLocalData] = useState(data); // editable copy of data
  const [newAddresses, setNewAddresses] = useState({});

  //Render when there is change to data
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleChange = (index, e) => {
    const newData = [...localData];
    newData[index][e.target.name] = e.target.value;
    setLocalData(newData);
  };

  const handleUpdate = async (id, index) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/customer/${id}`, {
        firstName: localData[index].firstName,
        lastName: localData[index].lastName,
        email: localData[index].email,
        phoneNumber: localData[index].phoneNumber,
        addresses: localData[index].addresses,
      });
      alert("Customer updated successfully");
      setEditIndex(null); // exit edit mode
    } catch (err) {
      console.error(err);
      alert("Failed to update customer");
    }
  };

  const handleNewAddressChange = (customerId, e) => {
    setNewAddresses({
      ...newAddresses,
      [customerId]: {
        ...newAddresses[customerId],
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleAddAddressInline = (customerId, index) => {
    const address = newAddresses[customerId];
    if (!address) return;

    // Append the new address to localData
    const updatedData = [...localData];
    updatedData[index].addresses = [...updatedData[index].addresses, address];
    setLocalData(updatedData);

    // Call your existing handleUpdate function to sync with backend
    handleUpdate(customerId, index);

    // Clear the input
    setNewAddresses({ ...newAddresses, [customerId]: {} });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/customer/${id}`);

      // Notify parent to update the list
      if (onCustomerDeleted) {
        onCustomerDeleted(id);
      }

      alert(`Customer with id: ${id} deleted successfully`);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div
        className="accordion accordion-flush w-100"
        id="accordionFlushExample"
      >
        {localData && localData.length > 0
          ? localData.map((d, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    style={{ backgroundColor: "#dddddd" }}
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapse${d.id}`}
                    aria-expanded="false"
                    aria-controls={`flush-collapse${d.id}`}
                  >
                    Customer {d.id + " "}
                    {d.firstName + " " + d.lastName}
                  </button>
                </h2>
                <div
                  id={`flush-collapse${d.id}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <form>
                      <div className="col-md-3">
                        <label for="email-info" className="form-label">
                          Email
                        </label>
                        <input
                          name="email"
                          value={d.email}
                          onChange={(e) => handleChange(index, e)}
                          type="email"
                          className="form-control"
                          id="email-info"
                          required
                          disabled={editIndex !== index}
                        />
                      </div>
                      <div className="col-md-3">
                        <label for="phone-info" className="form-label">
                          Phone Number
                        </label>
                        <input
                          name="phoneNumber"
                          value={d.phoneNumber}
                          onChange={(e) => handleChange(index, e)}
                          type="tel"
                          className="form-control"
                          id="phone-info"
                          required
                          pattern="^\d{10}$"
                          disabled={editIndex !== index}
                        />
                      </div>
                      <br />
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          setEditIndex(editIndex === index ? null : index)
                        }
                      >
                        {editIndex === index ? "Cancel Edit" : "Edit Info"}
                      </button>
                      {editIndex === index && (
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() =>
                            handleUpdate(localData[index].id, index)
                          }
                        >
                          Save
                        </button>
                      )}
                    </form>
                    <br />
                    <p>Addresses:</p>
                    <ul className="list-group w-25">
                      {d.addresses && d.addresses.length > 0 ? (
                        d.addresses.map((addr, i) => (
                          <li className="list-group-item" key={i}>
                            {addr.street}, {addr.city}, {addr.state}{" "}
                            {addr.zipcode}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item">
                          No addresses available
                        </li>
                      )}
                    </ul>
                    <br />

                    {/*Add address form */}
                    <h6>Add Address</h6>
                    <div className="row g-2 mb-2">
                      <div className="col-md-3">
                        <input
                          type="text"
                          name="street"
                          placeholder="Street"
                          className="form-control"
                          value={newAddresses[d.id]?.street || ""}
                          onChange={(e) => handleNewAddressChange(d.id, e)}
                        />
                      </div>
                      <div className="col-md-2">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          className="form-control"
                          value={newAddresses[d.id]?.city || ""}
                          onChange={(e) => handleNewAddressChange(d.id, e)}
                        />
                      </div>
                      <div className="col-md-2">
                        <select
                          name="state"
                          value={newAddresses[d.id]?.state || ""}
                          onChange={(e) => handleNewAddressChange(d.id, e)}
                          className="form-select"
                          id="state"
                          required
                        >
                          <option selected disabled value="">
                            Choose state...
                          </option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <input
                          type="text"
                          name="zipcode"
                          placeholder="Zipcode"
                          className="form-control"
                          value={newAddresses[d.id]?.zipcode || ""}
                          onChange={(e) => handleNewAddressChange(d.id, e)}
                        />
                      </div>
                      <div className="col-md-3">
                        <button
                          className="btn btn-success"
                          onClick={() => handleAddAddressInline(d.id, index)}
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                    <br />
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(d.id)}
                    >
                      Delete Customer
                    </button>
                  </div>
                </div>
              </div>
            ))
          : "Customers unavailable"}
      </div>
    </>
  );
}

export default CustomerList;
