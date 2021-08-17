import React, { useEffect, useState } from "react";
import AddForm from "../components/AddForm.jsx";
import Layout from '../components/Layout.jsx';

export default function AddPage(props){

  return (
    <Layout header="新規作成" home={false}>
      <AddForm></AddForm>
    </Layout>
  )
}