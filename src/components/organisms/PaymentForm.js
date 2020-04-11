import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { DataContext } from '../../context/DataContext';
import { v4 as uuidv4 } from 'uuid';
import { typePaymentConst } from '../../constants';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import styled, { css } from 'styled-components';
import { months } from '../../utils/months';

const StyledSelect = styled(Select)`
  margin: 10px 0;
`;

const getYears = () => {
  let actualYear = new Date().getFullYear();
  let yearsList = [...Array(10).keys()].map((x, i, a) => ({
    label: actualYear + i,
    value: actualYear + i,
  }));
  return yearsList;
};

const years = getYears();

const typePaymentInit = [
  { label: typePaymentConst.manual, value: typePaymentConst.manual },
  { label: typePaymentConst.auto, value: typePaymentConst.auto },
];

const animatedComponents = makeAnimated();

const PaymentForm = ({ id, onCloseModal }) => {
  const { handleSubmit, register, errors, getValues } = useForm();
  const { addPayment, updatePayment, expenses, categories } = useContext(DataContext);
  const [productToEdit, setProductToEdit] = useState();
  const [yearsState, setYearsState] = useState([]);
  const [monthsState, setMonthsState] = useState([]);
  const [categoryState, setCategoryState] = useState({});
  const [typeState, setTypeState] = useState({});

  useEffect(() => {
    //if id is passed, set product to edit
    if (id) {
      const findPayment = expenses.find((x) => x.id === id);
      const monthsMap = findPayment.month.map((x) => ({
        value: x,
        label: months.find((m) => m.value === x).label,
      }));
      const yearsMap = findPayment.year.map((x) => ({ label: x, value: x }));
      setProductToEdit(findPayment);
      setCategoryState(findPayment.category);
      setTypeState({ label: findPayment.typePayment, value: findPayment.typePayment });
      setMonthsState(monthsMap);
      setYearsState(yearsMap);
    }
  }, [id]);

  const onSubmit = (values) => {
    if (productToEdit) {
      const editedProduct = {
        ...productToEdit,
        ...values,
        month: monthsState.flatMap((x) => x.value),
        year: yearsState.flatMap((x) => x.value),
        category: categoryState,
        typePayment: typeState.value,
      };
      updatePayment(editedProduct);
      onCloseModal();
    } else {
      const id = uuidv4();

      addPayment({
        ...values,
        year: yearsState,
        month: monthsState,
        id,
      });

      onCloseModal();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        title="Payment name"
        name="name"
        defaultValue={productToEdit && productToEdit.name}
        ref={register({
          required: 'Required',
        })}
        isError={errors.name}
      />
      {errors.name && errors.name.message}

      <Input
        title="Deadline - day on month"
        name="deadline"
        defaultValue={productToEdit && productToEdit.deadline}
        ref={register({
          required: 'Required',
        })}
        isError={errors.deadline}
      />
      {errors.deadline && errors.deadline.message}

      <Input
        title="Amount expected"
        name="amountExpected"
        defaultValue={productToEdit && productToEdit.amountExpected}
        ref={register({
          required: 'Required',
          validate: (value) => !isNaN(value) || 'Required number!',
        })}
        isError={errors.amountExpected}
      />
      {errors.amountExpected && errors.amountExpected.message}

      <StyledSelect
        title="Category"
        placeholder="Category"
        name="category"
        value={productToEdit ? categoryState : null}
        onChange={(c) => setCategoryState(c)}
        options={categories}
        components={animatedComponents}
      />

      <StyledSelect
        title="Type payment"
        placeholder="Type payment"
        name="typePayment"
        value={productToEdit ? typeState : null}
        onChange={(t) => setTypeState(t)}
        options={typePaymentInit}
        components={animatedComponents}
      />

      <StyledSelect
        title="Months, where in payment must be included"
        placeholder="Months, where in payment must be included"
        name="month"
        value={productToEdit ? monthsState : null}
        onChange={(m) => (m ? setMonthsState(m) : [])}
        options={months}
        isMulti
        components={animatedComponents}
      />

      <StyledSelect
        title="Years, where in payment must be included"
        placeholder="Years, where in payment must be included"
        name="year"
        onChange={(y) => (y ? setYearsState(y) : [])}
        options={years}
        value={productToEdit ? yearsState : null}
        isMulti
        components={animatedComponents}
      />
      <Button isActive type="submit">
        {productToEdit ? 'Save' : 'Add'}
      </Button>
    </form>
  );
};

export default PaymentForm;
