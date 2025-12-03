// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchBooks, setSortBy, setOrder } from "../redux/bookSlice";

// export default function BooksList() {
//   const dispatch = useDispatch();
//   const { list, loading, error, sortBy, order } = useSelector((state) => state.books);

//   useEffect(() => {
//     dispatch(fetchBooks());
//   }, [dispatch]);

//   const sortedList = [...list].sort((a, b) => {
//     let fieldA = a[sortBy].toLowerCase();
//     let fieldB = b[sortBy].toLowerCase();
//     if (fieldA < fieldB) return order === "asc" ? -1 : 1;
//     if (fieldA > fieldB) return order === "asc" ? 1 : -1;
//     return 0;
//   });

//   if (loading) return <p>Loading books...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="page">
//       <h2>NYT Hardcover Fiction Books</h2>

//       <div style={{ marginBottom: "10px" }}>
//         <label>
//           Sort By:{" "}
//           <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
//             <option value="title">Title</option>
//             <option value="author">Author</option>
//             <option value="publisher">Publisher</option>
//           </select>
//         </label>

//         <label style={{ marginLeft: "10px" }}>
//           Order:{" "}
//           <select value={order} onChange={(e) => dispatch(setOrder(e.target.value))}>
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//           </select>
//         </label>
//       </div>

//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
//             <th style={{ border: "1px solid #ccc", padding: "8px" }}>Author</th>
//             <th style={{ border: "1px solid #ccc", padding: "8px" }}>Publisher</th>
//             <th style={{ border: "1px solid #ccc", padding: "8px" }}>ISBN</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedList.map((book, idx) => (
//             <tr key={idx}>
//               <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.title}</td>
//               <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.author}</td>
//               <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.publisher}</td>
//               <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.isbn}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, setSortBy, setOrder } from "../redux/bookSlice";

export default function BooksList() {
  const dispatch = useDispatch();
  const { list, loading, error, sortBy, order } = useSelector((state) => state.books);

  // Dummy data as fallback
  const dummyBooks = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", publisher: "Scribner", isbn: "9780743273565" },
    { title: "1984", author: "George Orwell", publisher: "Secker & Warburg", isbn: "9780451524935" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", publisher: "J.B. Lippincott & Co.", isbn: "9780061120084" }
  ];

  const displayList = list.length > 0 ? list : dummyBooks;

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const sortedList = [...displayList].sort((a, b) => {
    let fieldA = a[sortBy]?.toLowerCase() || "";
    let fieldB = b[sortBy]?.toLowerCase() || "";
    if (fieldA < fieldB) return order === "asc" ? -1 : 1;
    if (fieldA > fieldB) return order === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page">
      <h2>NYT Hardcover Fiction Books</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Sort By:{" "}
          <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </label>

        <label style={{ marginLeft: "10px" }}>
          Order:{" "}
          <select value={order} onChange={(e) => dispatch(setOrder(e.target.value))}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Author</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Publisher</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map((book, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.title}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.author}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.publisher}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
