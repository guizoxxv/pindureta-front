import React, { useContext, useState } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
  IconButton,
} from '@material-ui/core';
import { OrderContext } from '../../../context/order';
import DeleteIcon from '@material-ui/icons/Delete';
import QuantityRow from '../../../components/quantityRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { DialogContext } from '../../../context/dialog';
import OrderTableMoreDialog from './orderTableMoreDialog';
import OrderItem from '../../../interfaces/orderItem';
import useWindowWidth from '../../../utils/useWindowWidth';

const OrderTable: React.FC = () => {
  const { order, removeItem } = useContext(OrderContext);
  const { open } = useContext(DialogContext);
  const [selectedItem, setSelectedItem] = useState<OrderItem>({} as OrderItem);
  const { isMobile } = useWindowWidth();

  const handleOpenOrderTableMoreDialog = (product: OrderItem): void => {
    setSelectedItem(product);

    open('orderTableMore');
  }

  return (
    <TableContainer component={Paper}>
      {isMobile ? (
        <>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">
                  <Typography>Total</Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(order).map(item => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    <Typography>{item.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>
                      ${item.price} x {item.quantity} = ${item.total}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      onClick={() => handleOpenOrderTableMoreDialog(item)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <OrderTableMoreDialog product={selectedItem} />
        </>
      ) : (
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center"><Typography noWrap>Price ($)</Typography></TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center"><Typography noWrap>Total ($)</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(order).map(item => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={() => removeItem(item._id)} aria-label="remove">
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                    <Box ml={0.5}>
                      {item.name}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">
                  <QuantityRow productId={item._id} />
                </TableCell>
                <TableCell align="center">{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  )
};

export default OrderTable;