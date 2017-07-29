import React from 'react';
import { PropTypes as T } from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../Button';
import { total } from '../../services/product';
import '../../pages/pages.css';
import './Order.css';

export default function Order(props) {
  const {
    id,
    order,
    products,
    deliveryFee,
  } = props;

  // Calculate Price
  const orderKeys = Object.keys(order);
  const totalPrice = total(order, products);

  return (
    <div className="l-Order">
      <div className="Order-price-wrapper">
        <div className="Order-product-count" title="Banyaknya Jenis Produk">
          {Object.keys(order).length}
        </div>
        <div className="Order-price">
          {`Rp ${totalPrice.toLocaleString('id')}`}
        </div>
        <div className="Order-delivery-fee">
          <span className="Order-delivery-fee-label">
            + Ongkos Kirim
          </span>
          {` Rp ${deliveryFee.toLocaleString('id')}`}
        </div>
      </div>
      <div className="Order-action-wrapper">
        <Button
          display="content"
          action={(e) => props.clear()}
          icon="times"
          text="Kosongkan"
          isSecondary
          disabled={!orderKeys.length}
          />
        <Link
          to={`/pesan/${id}`}
        >
          <Button
            display="content"
            icon="shopping-cart"
            text="Pesan"
            disabled={!orderKeys.length}
          />
        </Link>
        {/**/}
      </div>
    </div>
  )
}

Order.propTypes = {
  order: T.objectOf(T.number).isRequired,
  products: T.objectOf(T.shape({
    name: T.string.isRequired,
    desc: T.string.isRequired,
    image: T.string.isRequired,
    unit: T.string.isRequired,
    step: T.number.isRequired,
    price: T.number.isRequired,
    category: T.string.isRequired,
  })).isRequired,
  deliveryFee: T.number.isRequired,
  clear: T.func.isRequired,
}