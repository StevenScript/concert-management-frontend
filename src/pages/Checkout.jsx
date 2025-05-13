import React, { useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { purchaseCart } from "../api/cartPurchase";
import {
  PageContainer,
  SectionWrapper,
  Title,
} from "../utils/StyledComponents";

export default function Checkout() {
  const { items, removeItem, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const total = items.reduce((sum, it) => sum + it.price, 0);

  const handlePurchase = async () => {
    setProcessing(true);
    await purchaseCart(items, user.email);
    clear();
    navigate("/account");
  };

  return (
    <PageContainer>
      <SectionWrapper>
        <Title>Checkout</Title>

        {items.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Venue</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((it, idx) => (
                    <TableRow key={`${it.id}-${idx}`}>
                      <TableCell>{it.name}</TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("en-CA").format(
                          new Date(it.date)
                        )}
                      </TableCell>
                      <TableCell>{it.venueName}</TableCell>
                      <TableCell align="right">
                        ${it.price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => removeItem(idx)}>
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>${total.toFixed(2)}</strong>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={() => navigate("/events")}>
                Continue Shopping
              </Button>
              <Button
                variant="contained"
                disabled={processing}
                onClick={handlePurchase}
              >
                {processing ? "Processing…" : "Purchase"}
              </Button>
            </Stack>
          </>
        )}
      </SectionWrapper>
    </PageContainer>
  );
}
