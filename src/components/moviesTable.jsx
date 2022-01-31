import React from "react";
import Like from "./common/like";
import Table from "./common/table";
// import TableBody from "./common/tableBody";
// import TableHeader from "./common/tableHeader";

class MoviesTable extends React.Component {
  // raiseSort = (path) => {
  //   const sortColumn = { ...this.props.sortColumn };

  //   if (sortColumn.path === path)
  //     sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
  //   else {
  //     sortColumn.path = path;
  //     sortColumn.order = "asc";
  //   }
  //   this.props.onSort(sortColumn);
  // };

  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    // {},
    // {},
    {
      label: "Like",
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      label: "Delete",
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />

      // // <table className="table">
      //   {/* <thead>
      //     <tr>
      //     <td>Title</td>
      //     <td>Genre</td>
      //     <td>Stock</td>
      //     <td>Rating</td>
      //     <td>Like</td>
      //     <td>Delete</td>

      //   <th onClick={() => this.raiseSort("title")}>Title</th>
      //       <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
      //       <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
      //       <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
      //       <th>Like</th>
      //       <th>Delete</th>
      //     </tr>
      //   </thead>    */}

      //   { /* <TableHeader
      //     columns={this.columns}
      //     sortColumn={sortColumn}
      //     onSort={onSort}
      //   />

      //   <TableBody columns={this.columns} data={movies} /> */}

      //   {/* <TableBody columns={this.columns} data={movies} /> */}

      //   {/* <tbody>
      //     {movies.map((movie) => (
      //       <tr key={movie._id}>
      //         <td>{movie.title}</td>
      //         <td>{movie.genre.name}</td>
      //         <td>{movie.numberInStock}</td>
      //         <td>{movie.dailyRentalRate}</td>
      //         <td>
      //           <Like liked={movie.liked} onClick={() => onLike(movie)} />
      //         </td>
      //         <td>
      //           <button
      //             onClick={() => onDelete(movie)}
      //             className="btn btn-danger btn-sm"
      //           >
      //             Delete
      //           </button>
      //         </td>
      //       </tr>
      //     ))}
      //   </tbody> */}
      // // </table>
    );
  }
}

export default MoviesTable;
