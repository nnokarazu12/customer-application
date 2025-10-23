function Table({ data }) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td>{d.id}</td>
              <td>{d.firstName}</td>
              <td>{d.lastName}</td>
              <td>{d.email}</td>
              <td>{d.phoneNumber}</td>
              <td>{d.dateCreated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
