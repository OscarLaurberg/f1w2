import React, { useState } from "react";
import {
  Switch,
  Route,
  NavLink,
  Prompt,
  useParams,
  useRouteMatch
} from "react-router-dom";
import "./index.css";

function App({ bookFacade }) {
  return (
    <div>
      <Header />
      <hr />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <Products bookFacade={bookFacade} />
          </Route>
          <Route path="/company">
            <Company />
          </Route>

          <Route path="/add-book">
            <AddBook bookFacade={bookFacade} />
          </Route>

          <Route path="/find-book">
            <FindBook bookFacade={bookFacade} />
          </Route>
          <Route>
            <PageDoesntExist />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/add-book">
            Add Book
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/company">
            Company
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/find-book">
            Find book
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

function FindBook({ bookFacade }) {
  const emptyBook = { id: undefined, title: "", info: "" };
  const [book, setBook] = useState(emptyBook);
  const [editBook, setEditBook] = useState(false);
  const [bookId, setBookId] = useState();

  const handleIdSubmit = e => {
    e.preventDefault();
    setBook({ ...bookFacade.findBook(bookId) });
  };
  const handleIdChange = ({ target }) => {
    setBookId(target.value);
  };
  const handleBookSubmit = e => {
    e.preventDefault();
    bookFacade.addBook(book);
    setBook({... bookFacade.findBook(bookId)})
  };
  const handleBookChange = ({ target }) => {
    setBook({ ...book, [target.id]: target.value });
  };
  const deleteBook = () => {
    bookFacade.deleteBook(book.id);
    setBook(emptyBook);
  };

  return (
  <div>
      
      <form>
        <input
          type="number"
          id="id"
          placeholder="Book ID"
          onChange={handleIdChange}
        />
        <button type="submit" onClick={handleIdSubmit}>
          GO!
        </button>
      </form>
      <div>
      <ShowEditDeleteBook
          setEditBook={setEditBook}
          handleBookChange={handleBookChange}
          handleBookSubmit={handleBookSubmit}
          book={book}
          deleteBook={deleteBook}
          editBook={editBook}
        />
      </div>
    
  </div>
  )
}

function ShowEditDeleteBook({
  book,
  deleteBook,
  editBook,
  handleBookChange,
  handleBookSubmit,
  setEditBook
}) {
  if (book.id === undefined) {
    return (
      <div>
        <p>Please enter an ID</p>
     </div>
    );
  } else if (!editBook) {
    return (
      <ShowBook book={book} setEditBook={setEditBook} deleteBook={deleteBook} />
    );
  } else {
    return (
      <EditBook
        setEditBook={setEditBook}
        book={book}
        handleBookChange={handleBookChange}
        handleBookSubmit={handleBookSubmit}
      />
    );
  }
}

function ShowBook({ book, setEditBook, deleteBook }) {  return (
    <div>
      <p>ID: {book.id}</p>
      <p>Title: {book.title}</p>
      <p>Info: {book.info}</p>
      <button onClick={deleteBook}>Delete Book</button>
      <button onClick={() => setEditBook(true)}> Edit Book </button>
      </div>
  );
}

function EditBook ({book, handleBookChange, handleBookSubmit, setEditBook}) {
  return (
    <div>
      <form>
        <label>ID</label>
        <input id="id" readOnly value={book.id}/>
        <br/>
        <label>Title</label>
        <input id="title" placeholder="Add Title" value={book.title} onChange={handleBookChange}/>
        <br/>
        <label>Info</label>
        <input id="info" placeholder="Add info" value={book.info} onChange={handleBookChange}/>
        <br />
        <button onClick={handleBookSubmit}>Save</button>
        <button onClick={() => setEditBook(false)}> Cancel</button>
      </form>
      </div>
  )
}

function Home() {
  return <h1>Home</h1>;
}
function Products({ bookFacade }) {
  let { path, url } = useRouteMatch();
  const books = [...bookFacade.getBooks()].map(({ id, title }) => (
    <li key={id}>
      {title}
      <NavLink to={`${url}/${id}`}>Details</NavLink>
    </li>
  ));
  return (
    <React.Fragment>
      <h1>Product</h1>
      <ul>{books}</ul>

      <Switch>
        <Route path={`${path}/:bookId`}>
          <Details bookFacade={bookFacade} />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

function Company() {
  return <h1>DSA</h1>;
}

function PageDoesntExist() {
  return <h1>Page doesn't exist</h1>;
}

function Details({ bookFacade }) {
  let { bookId } = useParams();
  const book = bookFacade.getBooks().find(({ id }) => bookId == id);
  console.log("bookId " + bookId);
  console.log(book);
  return (
    <div>
      <p>Title: {book.title}</p>
      <p>ID: {book.id}</p>
      <p>Info: {book.info}</p>
    </div>
  );
}

function AddBook({ bookFacade }) {
  const emptyBook = { title: "", info: "" };
  const [book, setBook] = useState(emptyBook);
  const [isBlocking, setIsBlocking] = useState(false);

  const handleChange = ({ target }) => {
    setBook({ ...book, [target.id]: target.value });
    if (
      document.querySelector("#title").value == "" &&
      document.querySelector("#info").value == ""
    ) {
      setIsBlocking(false);
    } else {
      setIsBlocking(true);
    }
    console.log(book);
  };

  const handleSubmit = e => {
    e.preventDefault();
    bookFacade.addBook(book);
    setBook(emptyBook);
    setIsBlocking(false);
  };

  return (
    <React.Fragment>
      <form>
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />

        <label>Title</label>
        <input
          id="title"
          placeholder="Enter title"
          value={book.title}
          onChange={handleChange}
        />
        <label>Info</label>
        <input
          id="info"
          value={book.info}
          placeholder="Enter info"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </React.Fragment>
  );
}

export default App;
