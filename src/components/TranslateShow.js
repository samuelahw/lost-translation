import React from "react"
import { makeImageArray } from "./ImageModule"

//Component for showing translation images

export const TranslateShow = (props) => {

    return (
        <>
            {makeImageArray(props.props.replace(/\s/g, "")).map((image, index) => <img key={index} src={image} alt="no" />)}
        </>
    )
}