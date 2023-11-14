import React, { useEffect, useState, useRef } from "react";
import ReactPaginate from 'react-paginate';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Users() {
  //setting state
  const [data, setData] = useState([]);
  const [limit,setLimit]=useState(5);
  const [pageCount,setPageCount]=useState(1);
  const currentPage=useRef();

  useEffect(() => {
    currentPage.current=1;
    // getAllUser();
    getPaginatedUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
   
  //fetching all user
  const getAllUser = () => {
    fetch("http://localhost:3001/users/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "getUserData");
        setData(data.data);
      });
  };
   
  //deleting user
  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:3001/users/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    } else {
    }
  };
   
  //pagination
  function handlePageClick(e) {
    console.log(e);
   currentPage.current=e.selected+1;
    getPaginatedUsers();
  }
   
  function changeLimit(){
    currentPage.current=1;
    getPaginatedUsers();
  }
   
  function getPaginatedUsers(){
    fetch(`http://localhost:3001/users/paginatedUsers?page=${currentPage.current}&limit=${limit}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "getUserData");
        setPageCount(data.pageCount);
        setData(data.result)
      });
  }

  return (
    <>
     
     <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>All Users</h3>
        <table style={{ width: 500 }}>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact</th>
            <th>Location</th>
            <th>Occupation</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
          {data.map((i) => {
            return (
              <tr>
                <td>{i.firstName}</td>
                <td>{i.lastName}</td>
                <td>{i.contact}</td>
                <td>{i.location}</td>
                <td>{i.occupation}</td>
                <td>{i.email}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteUser(i._id, i.email)}
                  />
                </td>
              </tr>
            );
          })}
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
          forcePage={currentPage.current-1}
        />
        <input placeholder="Limit" onChange={e=>setLimit(e.target.value)}/>
        <button onClick={changeLimit}>Set Limit</button>
      </div>
    </div>
    </>
  );
};

export default Users;
