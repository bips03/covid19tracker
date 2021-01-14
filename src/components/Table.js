import React from 'react'
import "./Table.css"
import numeral from "numeral"

function Table({data}) {
    return (
        <div className = "table">
            {data.map(countryData => {
                return (
                    <tr>
                        <td>
                            {countryData.country}
                        </td>
                        <td>
                             <strong>{numeral(countryData.cases).format("0,0")}</strong>                   
                        </td>
                    </tr>
                    
                )
            })}
        </div>
    )
}

export default Table
