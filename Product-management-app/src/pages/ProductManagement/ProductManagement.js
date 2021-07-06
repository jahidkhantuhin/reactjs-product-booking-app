import React, { useState } from 'react'
import BookingForm from "./Form/BookingForm";
import ReturnForm from "./Form/ReturnForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as productData from "../../data/productData";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px',
    }
}))



const headCells = [
    { id: 'serialNumber', label: 'No' },
    { id: 'productName', label: 'Name' },
    { id: 'productCode', label: 'Code' },
    { id: 'availability', label: 'Availability' },
    { id: 'needing_repair', label: 'Need to Repair' },
    { id: 'durability', label: 'Durability'},
    { id: 'mileage', label: 'Mileage' },
]

export default function Employees() {

    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openBookingPopup, setOpenBookingPopup] = useState(false)
    const products = productData.getProductData()
    const [productReturnForm, setProductReturnForm] = useState(false)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(products, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (resetForm) => {
        resetForm()
        setOpenBookingPopup(false)
    }

    const openInPopup = item => {
        setOpenBookingPopup(true)
    }

    return (
        <>
            <PageHeader
                title="Product Management"
                subTitle="Product Booking and return management"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((item, index) =>
                                (<TableRow key={item.code}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.code}</TableCell>
                                    <TableCell>{item.availability == true ? 'Available' : 'Not Available'}</TableCell>
                                    <TableCell>{item.needing_repair == false ? 'Not Needed' : 'Needed'}</TableCell>
                                    <TableCell>{item.durability}</TableCell>
                                    <TableCell>{item.mileage != null ? item.mileage : 'Not Applicable' }</TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                
                <TblPagination />
                    <Toolbar>
                        <Controls.Button
                            text="Book"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => { setOpenBookingPopup(true);}}
                        />
                    </Toolbar>
                    <Toolbar>
                        <Controls.Button
                            text="Return"
                            variant="outlined"
                            startIcon={<RemoveIcon />}
                            className={classes.newButton}
                            onClick={() => { setOpenBookingPopup(true); setProductReturnForm(true)}}
                        />
                    </Toolbar>
                
            </Paper>
            <Popup
                title={productReturnForm ? "Product Return Form" : "Product Booking Form"}
                openPopup={openBookingPopup}
                setOpenPopup={setOpenBookingPopup}
            >
                {productReturnForm ? <ReturnForm 
                    addOrEdit={addOrEdit}/> : 
                    <BookingForm
                    addOrEdit={addOrEdit} />}
            </Popup>
        </>
    )
}
