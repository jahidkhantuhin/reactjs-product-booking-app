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
    const products = productData.getProductData()
    const [bookingCalculation, setBookingCalculation] = useState (false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const currentTime = new Date()

    const classes = useStyles();
    
    const { addOrEdit} = props

    const initialBookingValues = {
        code: '',
        fromDate: new Date(),
        toDate: new Date()
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
    } = useForm(initialBookingValues, true, validate);
    
    const bookingComplete = () => {
        productData.newBookedProduct(selectedProduct)
        addOrEdit(resetForm);

    }
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            setBookingCalculation(true)
            productData.selectedProduct(values)
            setSelectedProduct (JSON.parse(localStorage.getItem('newBSelected')))
        }
        
        
        
    }


    return (
        <>
        {bookingCalculation ? 
        <Grid container>
            <Card className={classes.root}>
            <CardActionArea>
            {selectedProduct.rent_period > 0 ? 
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {selectedProduct.name}
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" component="p">
                        You choose Rent Period: <strong>{selectedProduct.rent_period}</strong>. 
                        Total milage is {selectedProduct.mileage == null ? 'Not Applicable' : selectedProduct.mileage}. 
                        {selectedProduct.needing_repair ? 'This product need to be fixed' : 'This product does not need to fixed' }.
                        Total Price is <strong>{selectedProduct.price * selectedProduct.rent_period}</strong>.
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Do you want to proceed?
                    </Typography>
                </CardContent>
            : 
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    <>Rental period must be greater than 1, then you can proceed...</>
                    </Typography>
                </CardContent>}
                
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={bookingComplete} disabled={selectedProduct.rent_period <= 0}>
                Ok
                </Button>
                <Button size="small" color="primary" onClick={() => setBookingCalculation(false)} >
                Cencel
                </Button>
            </CardActions>
        </Card>
        </Grid> 
         : 
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Select
                        name="code"
                        label= 'Product Name'
                        value={values.name}
                        onChange={handleInputChange}
                        options={products}
                        error={errors.code}
                        />
                </Grid>
                <Grid item xs={6}>
                    <Controls.DatePicker
                        name="fromDate"
                        label="From"
                        value={values.fromDate}
                        onChange={handleInputChange}
                    />
                    <Controls.DatePicker
                        name="toDate"
                        label="To"
                        value={values.toDate}
                        onChange={handleInputChange}
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
            
        </Form>}
        
        </>
    )
}
