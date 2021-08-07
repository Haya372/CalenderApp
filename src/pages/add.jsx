import React, { useEffect, useState } from "react";
import AddForm from "../components/AddForm.jsx";

export default function AddPage(props){
  return (
    <div>
      This is Add page
      <div>{props.user.name}</div>
      <AddForm></AddForm>
    </div>
  )
}