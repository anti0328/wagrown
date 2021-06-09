import React from 'react';
import { Formik } from 'formik';
import { iconsTypes } from '../../../../helpers/iconsTypes';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { routes } from '../../../../helpers/routes';
import * as yup from 'yup';
import Button from '../../../atoms/Button';
import ShippingInfoWrapper from './Wrappers/ShippingInfoWrapper';
import DeliveryWrapper from './Wrappers/DeliveryWrapper';
import PaymentWrapper from './Wrappers/PaymentWrapper';
import CartWrapper from './Wrappers/CartWrapper';
import {
  StyledFormWrapper,
  StyledButtonsWrapper,
  StyledForm,
  StyledFormFooter,
  StyledHeading,
  StyledSubmitBtn,
  StyledContinueBtn,
  StyledLoginBtn,
} from './StyledCheckoutForm';

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Name is a required field')
    .min(3, 'Name must be at least 3 characters'),
  lastName: yup
    .string()
    .required('Last name is a required field')
    .min(3, 'Last name must be at least 3 characters'),
  email: yup.string().email().required('Email is a required field'),
  city: yup
    .string()
    .required('City is required field')
    .min(3, 'City must be at least 3 characters'),
  phoneNumber: yup
    .string()
    .required('Phone number is required field')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid'
    ),
});

const CheckoutForm = () => {
  const { goBack } = useHistory();

  return (
    <StyledFormWrapper>
      <StyledHeading>Shipping and Payment</StyledHeading>

      <Formik
        initialValues={{
          email: '',
          address: '',
          firstName: '',
          city: '',
          lastName: '',
          postalCode: '',
          phoneNumber: '',
          country: 'Poland',
          payment: '',
          delivery: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange }) => (
          <StyledForm>
            <StyledButtonsWrapper>
              <StyledLoginBtn>LOG IN</StyledLoginBtn>
              <Button secondary>SIGN IN</Button>
            </StyledButtonsWrapper>

            <ShippingInfoWrapper
              values={values}
              handleChangeFn={handleChange}
            />

            <PaymentWrapper handleChangeFn={handleChange} />

            <DeliveryWrapper handleChangeFn={handleChange} />

            <CartWrapper />

            <StyledFormFooter>
              <Button onClickFn={goBack} icon={iconsTypes.arrowLeft} goBack>
                Back
              </Button>
              <StyledButtonsWrapper>
                <Link to={routes.products}>
                  <StyledContinueBtn secondary>
                    CONTINUE SHOPPING
                  </StyledContinueBtn>
                </Link>
                <StyledSubmitBtn type="submit">
                  PROCEED TO PAYMENT
                </StyledSubmitBtn>
              </StyledButtonsWrapper>
            </StyledFormFooter>
          </StyledForm>
        )}
      </Formik>
    </StyledFormWrapper>
  );
};

export default CheckoutForm;