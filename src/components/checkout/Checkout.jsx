import React from 'react';
import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cart';
import { currencyFormatter } from '../../util/formatting';
import Input from '../UI/Input';
import Button from '../UI/Button';
import UserProgressContext from '../../store/UserProgress';
import { useFetch } from '../../hooks/useFetch';
import Error from '../error/Error';

const requestObj = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const Checkout = () => {
  const { items, clearCart } = useContext(CartContext);
  const { hideCheckout, progress } = useContext(UserProgressContext);

  // ! we need to call it when the form is submitted
  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData,
  } = useFetch('http://localhost:3000/orders', requestObj);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  const handleClose = () => {
    hideCheckout();
  };

  const handleFinish = () => {
    hideCheckout();
    clearCart();
    clearData();
  };

  // ! handling form submitting with Form data object
  const handleSubmit = (e) => {
    e.preventDefault();

    //   ! create new form data object, but we need to pass there an event target
    const fd = new FormData(e.target);
    //   ! then to get a normal object with keys (input names) and values
    //   ! we need to call a special method fromEntries on an Object and then entries on initial fd object
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      }),
    );
  };

  let actions = !isSending ? (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit order</Button>
    </>
  ) : (
    <span>Sending order data...</span>
  );

  if (data && !error) {
    return (
      <Modal open={progress === 'checkout'} onClose={handleClose}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully!</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error message={error} title="failed to submit an order!" />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
