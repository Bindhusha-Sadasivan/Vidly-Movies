import React from "react";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { Paginate } from "../utilsfolder/paginate";
import { getMovies } from "./../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Movies extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { movies: getMovies() };
  //   }

  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleDelete = (movie) => {
    // console.log(movie);

    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = (movie) => {
    // console.log("Like cliked", movie);

    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    // console.log("Page Changed", page);

    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    // console.log("GENRES", genre);

    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  // handleSort = (path) => {
  //   // console.log(path);
  //   // this.setState({ sortColumn: { path, order: "asc" } });

  //   const sortColumn = { ...this.state.sortColumn };

  //   if (sortColumn.path === path)
  //     sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
  //   else {
  //     sortColumn.path = path;
  //     sortColumn.order = "asc";
  //   }
  //   this.setState({ sortColumn });
  // };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = Paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;

    const { pageSize, currentPage, sortColumn } = this.state;

    // const {
    //   pageSize,
    //   currentPage,
    //   selectedGenre,
    //   movies: allMovies,
    //   sortColumn,
    // } = this.state;

    if (count === 0) return <h1>There are no Movies in the Database</h1>;

    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
    //     : allMovies;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              // textProperty="name"
              // valueProperty="_id"
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>

          <div className="col">
            {/* <h1>Showing {count} Movies in the Database</h1> */}
            {/* <h1>Showing {filtered.length} Movies in the Database</h1> */}

            <h1>Showing {totalCount} Movies in the Database</h1>

            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />

            <Pagination
              // itemsCount={count}
              // itemsCount={filtered.length}
              itemsCount={totalCount}
              pageSize={pageSize}
              // pageSize={10}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
