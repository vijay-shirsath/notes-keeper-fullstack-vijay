import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { Provider } from "react-redux";
import store from "./store/store";
import { loadUser } from "./store/slices/authSlice";

const rootElement = document.getElementById("root");
store.dispatch(loadUser());
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  </BrowserRouter>,
  rootElement
);

//CHALLENGE:
//1. Implement the add note functionality.
//- Create a constant that keeps track of the title and content.
//- Pass the new note back to the App.
//- Add new note to an array.
//- Take array and render seperate Note components for each item.

//2. Implement the delete note functionality.
//- Callback from the Note component to trigger a delete function.
//- Use the filter function to filter out the item that needs deletion.
//- Pass a id over to the Note component, pass it back to the App when deleting.

//This is the end result you're aiming for:
//https://pogqj.csb.app/
