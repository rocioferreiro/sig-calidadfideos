import React from "react";
import Layout from "../../components/Layout";
import Details from "./Details";
import {useParams} from "react-router-dom";

export default function BatchDetails() {
  const params  = useParams();

  return <Layout>
    {params && <Details id={params.id}/>}
  </Layout>
}
