import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Input, Button, Row, Col } from "antd"
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { collection, query, limit, where } from "firebase/firestore";
import { debounce } from "lodash"
import { COLLECTIONS } from "../../consts";
import { firestore } from "../../config/firebase";
import { doctorIndex } from "../../config/algolia";

const Wrap = styled.div`
  position: relative;
`

const DoctorListWrap = styled.div`
  position: absolute;
  top: 40px;
  width: 100%;
  border: 1px solid #eee;
  z-index: 5;
`

const DoctorItem = styled.div`
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 10px 20px;
  &:hover {
    background: #ddd;
    cursor: pointer;
  }
  > p {
    padding: 0px;
    margin: 0px;
  }
`

const DoctorSearch = ({ value = "", onChange, }) => {
  const [ searchText, setsearchText ] = useState()
  const [ searchResults, setsearchResults ] = useState()
  
  const handleInput = (e) => {
    const { value: seachTextInput } = e.target
    setsearchText(seachTextInput)
    if (!seachTextInput) {
      setsearchResults()
    } else {
      searchDocs(seachTextInput)
    }
  }

  const searchDocs = (text) => {
    doctorIndex.search(text)
    .then(data => {
      setsearchResults(data.hits)
    })
  }

  const handleSelect = (doc) => {
    delete doc._highlightResult
    
    onChange?.(
      doc
    )
    setsearchResults()
    setsearchText()
  }

   return (
    <Wrap>
      <Row>
        <Col flex={1}>
          <Input
            value={(value && value.full_name) || searchText}
            placeholder="Seach Doctor by name and phone"
            onChange={handleInput}
          />
        </Col>
        <Col style={{ width: 100 }}>
          {value && (
            <Button type="danger" onClick={() => { onChange() }}>
              Remove
            </Button>
          )}
        </Col>
      </Row>
      
    
      {searchResults && (
        <React.Fragment>
          {searchResults.length > 0 ? (
            <DoctorListWrap>
              {searchResults.map((doc) => (
                <DoctorItem key={doc.objectID} onClick={() => { handleSelect(doc) }}>
                  <p>{doc.full_name}</p>
                  <h6>{doc.phone} | {doc.clinic_name} | {doc.street_address}</h6>
                </DoctorItem>
              ))}
              
            </DoctorListWrap>
          ) : (
            <p>No Doctors found</p>
          )}
        </React.Fragment>
      )}
    </Wrap>
  )
}

export default DoctorSearch