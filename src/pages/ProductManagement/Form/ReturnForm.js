import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import * as productData from "../../../data/productData";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

export default function EmployeeForm(props) {
    const products = productData.getBookedProductData()
    const [returningCalculation, setReturningCalculation] = useState (false)
    const [selectedReturnProduct, setSelectedReturnProduct] = useState(null)



    const classes = useStyles();
    
    const { addOrEdit, recordForEdit } = props

    const initialReturningValues = {
        code: '',
        currentDate: new Date()
    }

    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('code' in fieldValues)
            temp.code = fieldValues.code ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialReturningValues, true, validate);
    
    const returningComplete = () => {
        productData.newReturnedProduct()
        addOrEdit(resetForm);

    }
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            setReturningCalculation(true)
            productData.selectedReturnProduct(values)
            setSelectedReturnProduct (JSON.parse(localStorage.getItem('newRSelected')))
        }
      
        
    }


    return (
        <>
        {products != null ? <div>
        {returningCalculation ? 
        <Grid container>
            <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {selectedReturnProduct.name}
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" component="p">
                        Used Milage: <strong>{selectedReturnProduct.mileage}</strong>.
                        Reduced Durability: {selectedReturnProduct.durability}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Do you want to proceed?
                    </Typography>
                </CardContent>
                
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={returningComplete}>
                Ok
                </Button>
                <Button size="small" color="primary" onClick={() => setReturningCalculation(false)} >
                Cencel
                </Button>
            </CardActions>
        </Card>
        </Grid> 
         : 
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Select
                        name="code"
                        label= 'Product Name'
                        value={values.name}
                        onChange={handleInputChange}
                        options={products}
                        error={errors.code}
                        />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Yes"
                            />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
                
            </Grid>
            
        </Form>}</div> : <div> No Products booked yet. So returning product list is empty....</div>}
        
        </>
    )
}
