import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //  navigate ke liye import

const Library = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate(); //  navigate hook

  // Load from localStorage
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  }, []);

  // Save to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...books];
      updated[editIndex] = formData;
      setBooks(updated);
      setEditIndex(null);
    } else {
      setBooks([...books, formData]);
    }

    setFormData({ title: "", author: "", genre: "", year: "" });
  };

  const handleEdit = (index) => {
    setFormData(books[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (confirm("Do You want to delete this Book ???")) {
      const updated = books.filter((books, i) => i !== index);
      setBooks(updated);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out!");
    navigate("/login");
  };

  return (
    <>
      <div className="container py-5">
        <div className="card shadow-lg p-4 mb-5 rounded border-0">
          <h2 className="text-center mb-4"> Library Management System</h2>

          {/* Add/Edit Book Form */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-3">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Book Title"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="Genre"
                  className="form-control"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Year"
                  className="form-control"
                />
              </div>
              <div className="col-md-1 text-center">
                <button className="btn btn-primary w-100" type="submit">
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Table of Books */}
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover text-center mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.length > 0 ? (
                    books.map((book, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>{book.year}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(index)}
                            className="btn btn-warning btn-sm me-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-muted">
                        No books added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/*  Logout Button  */}
        <div className="text-center mt-4">
          <button onClick={handleLogout} className="btn btn-outline-danger px-5">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Library;
