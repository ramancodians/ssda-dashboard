import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { COLLECTIONS, DATE_FORMAT } from "../../consts";
import { firestore } from "../../config/firebase";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { query, where, collection, getDocs } from "firebase/firestore";
import { Button, Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

const Wrap = styled.div`
  
`

const WorkCodeSearch = styled.div`
  display: flex;
  > input {
    font-size: 20px;
    width: 100%;
    flex: 1;
    border: 1px solid #ddd;
    padding: 8px;
  }

  > button {
    height: 50px;
  }
`

const ListWrap = styled.div`
  min-height: 200px;
  margin-top: 20px;
`

const WorkWrap = styled.div`
  background: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
`

const WorkList = ({ }) => {
  const history = useHistory()
  const [ results, setresults ] = useState()
  const [ isLoading, setisLoading ] = useState()
  const [ searchText, setsearchText ] = useState()

  const getWork = async () => {
    setisLoading(true)
    const q = query(
        collection(firestore, COLLECTIONS.WORK),
        where("code", "==", searchText)
      )
    const snap = await getDocs(q)
    const data = snap.docs.map(x => ({ ...x.data(), id: x.id }))
    console.log({ data });
    setresults(data)
    setisLoading(false)
  }

  const isValid = searchText && searchText.length === 3

   return (
    <Wrap>
      <WorkCodeSearch>
        <input
          type="text"
          placeholder="Search by Work Code"
          onChange={(e) => { setsearchText((e.target.value || "").toUpperCase()) }}
          value={searchText}
        />
        <Button type="primary" onClick={getWork} disabled={!isValid}>
          Search
        </Button>
      </WorkCodeSearch>

      <ListWrap>
        {!isLoading && results && results.length === 0 && (
          <h3>No entry found!</h3>
        )}

        {isLoading && (
          <h3>Loading...</h3>
        )}

        {results && results.length > 0 && results.map(work => (
          <WorkWrap onClick={() => { history.push(`/staff/work/${work.code}`) }} key={work.id}>
           <Row>
             <Col>
                <h2>{work.code}</h2>
                <h4>{format(work.created_on.toDate(), DATE_FORMAT)}</h4>
             </Col>
             <Col>
             </Col>
           </Row>
          </WorkWrap>
        ))}
      </ListWrap>

      
    </Wrap>
  )
}

export default WorkList