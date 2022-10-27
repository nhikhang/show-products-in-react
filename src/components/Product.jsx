import React, { useEffect, useState } from 'react';
/**
 * import table
 */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * import loading
 */
 import CircularProgress from '@mui/material/CircularProgress';

 /**
  * 
  * @returns Dialog
  */

  import Button from '@mui/material/Button';
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  import DialogTitle from '@mui/material/DialogTitle';
import { SentimentSatisfiedOutlined } from '@mui/icons-material';

const Product = () => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleShowInfo = (item) => {
        handleOpen();
        setInfo(item);
    }

    useEffect(() => {
        setLoading(true);
        fetch("https://fakestoreapi.com/products/")
        .then(res => res.json())
        .then(data => setRows(data))
        .catch(err => console.lof(err))
        .finally(() => {
            setLoading(false);
        })
    }, []);

    return loading ? ( <CircularProgress /> ) : (
        <div className="container">
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Imgae</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Description</TableCell>                    
                </TableRow>
                </TableHead>
                <TableBody>
                { rows.length > 0 && rows.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => {handleShowInfo(row)}}
                    >
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="right">
                        <img src={row.image} alt={row.title} />
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>                    
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Product Detail"}
                </DialogTitle>
                <DialogContent>
                    <p><img src={info.image} alt={info.title} /></p>
                    <p>{info.title}</p>
                    <p>{info.price}</p>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Add Card</Button>
                <Button onClick={handleClose} autoFocus>
                    Buy Now
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default Product;