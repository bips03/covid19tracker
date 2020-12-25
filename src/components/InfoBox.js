import React from 'react'
import {Card,CardContent,Typography} from "@material-ui/core"

function InfoBox({title,cases,total}) {
    return (
        <Card className = "infoBox">
            <CardContent>
                {/* Title*/}
                <Typography 
                className = "infoBox__title"
                color = "textSecondary">
                    {title}
                </Typography>
                {/* Cases */}
                <h2 className = "infoBox__cases">{cases}</h2>
                {/* Total */}
                <Typography
                className = "infoBox__total"
                color = "textSecondary">
                    {total} Total
                </Typography>
                {/* Tested */}

            </CardContent>
        </Card>
    )
}

export default InfoBox
