import { useState } from "react";
import axios from "axios";

function CustomerForm({ onCustomerAdded }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    addresses: [{ street: "", city: "", state: "", zipcode: "" }],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (index, e) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index][e.target.name] = e.target.value;
    setFormData({ ...formData, addresses: newAddresses });
  };

  //Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/customer",
        formData
      );
      alert(`Customer created! ID: ${response.data.id}`);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        addresses: [{ street: "", city: "", state: "", zipcode: "" }],
      });

      //Notify parent on customer addition
      if (onCustomerAdded) {
        onCustomerAdded();
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to create customer");
    }
  };
  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label for="validationDefault01" className="form-label">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            id="validationDefault01"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label for="validationDefault02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            id="validationDefault02"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label for="email" className="form-label">
            Email
          </label>
          <div className="input-group">
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              aria-describedby="inputGroupPrepend2"
              required
            />
          </div>
        </div>
        <div className="col-md-4">
          <label for="phone" className="form-label">
            Phone Number
          </label>
          <div className="input-group">
            <input
              type="tel"
              name="phoneNumber"
              className="form-control"
              id="phone"
              value={formData.phoneNumber}
              aria-describedby="inputGroupPrepend2"
              maxlength="10"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {formData.addresses.map((address, index) => (
          <div key={index}>
            <div className="col-md-6">
              <label for="street" className="form-label">
                Street Address
              </label>
              <input
                name="street"
                value={address.street}
                onChange={(e) => handleAddressChange(index, e)}
                type="text"
                className="form-control"
                id="street"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="city" className="form-label">
                City
              </label>
              <input
                name="city"
                value={address.city}
                type="text"
                onChange={(e) => handleAddressChange(index, e)}
                className="form-control"
                id="city"
                required
              />
            </div>
            <div className="col-md-3">
              <label for="state" className="form-label">
                State
              </label>
              <select
                name="state"
                value={address.state}
                onChange={(e) => handleAddressChange(index, e)}
                className="form-select"
                id="state"
                required
              >
                <option selected disabled value="">
                  Choose...
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
            <div className="col-md-3">
              <label for="validationDefault05" className="form-label">
                Zipcode
              </label>
              <input
                type="text"
                name="zipcode"
                className="form-control"
                maxlength="5"
                onChange={(e) => handleAddressChange(index, e)}
                id="zipCode"
                pattern="^([0-9]{5})$"
                required
              />
            </div>
          </div>
        ))}
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </>
  );
}

export default CustomerForm;
