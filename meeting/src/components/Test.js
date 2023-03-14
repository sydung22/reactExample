import React, { useEffect, useState } from "react";
const INITIAL_STATE = {
  username: "",
  email: "",
  option: "",
};
const FormExample = (props) => {
  const { username: selectedUsername, onCancelEdit } = props;
  const [form, setForm] = useState(INITIAL_STATE);
  const [invalidFeedbacks, setInvalidFeedbacks] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email } = form;
    const feedback = {};
    if (!username || username.length < 6) {
      feedback.username = "User name is incorrect.";
    }
    if (!email || email.length < 6) {
      feedback.email = "Email is incorrect.";
    }
    setInvalidFeedbacks(feedback);
    if (Object.keys(feedback).length) {
      return;
    }
    if (selectedUsername) {
      alert("update data");
      onCancelEdit();
    } else {
      alert("insert data");
    }
    handleReset();
  };
  const handleValueChanged = (e) => {
    const {
      target: { value, name },
    } = e;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleReset = () => {
    setInvalidFeedbacks({});
    setForm(INITIAL_STATE);
  };
  useEffect(() => {
    setForm({
      ...form,
      username: selectedUsername,
    });
  }, [selectedUsername]);
  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="form-group">
            <label htmlFor="usrname">Username</label>
            <input
              className={`form-control ${
                invalidFeedbacks.username ? "is-invalid" : ""
              }`}
              id="usrname"
              name="username"
              type="text"
              value={form.username}
              onChange={handleValueChanged}
            />
            <div className="invalid-feedback">{invalidFeedbacks.username}</div>
          </div>
          <div className="form-group">
            <label htmlFor="usremail">Email</label>
            <input
              className={`form-control ${
                invalidFeedbacks.email ? "is-invalid" : ""
              }`}
              id="usremail"
              name="email"
              type="text"
              value={form.email}
              onChange={handleValueChanged}
            />
            <div className="invalid-feedback">{invalidFeedbacks.email}</div>
          </div>
          <div className="d-flex" style={{ gap: 10 }}>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button className="btn " type="reset">
              Reset
            </button>
            {!!selectedUsername && (
              <button className="btn btn-danger" type="btn" onClick={onCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
const App = (props) => {
  const [username, setUsername] = useState("");
  return (
    <div className="container py-3">
      <FormExample username={username} onCancelEdit={() => setUsername("")} />
      <button
        className="btn btn-danger"
        onClick={() => setUsername(`admin_${Math.random()}`)}
      >
        Random user
      </button>
    </div>
  );
};
export default App;
