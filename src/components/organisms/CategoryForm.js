import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { DataContext } from '../../context/DataContext';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const StyledWrapperBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CategoryForm = ({ id, onCloseModal }) => {
  const { handleSubmit, register, errors, getValues } = useForm();
  const { addCategory, updateCategory, removeCategory, categories } = useContext(DataContext);
  const [categoryToEdit, setCategoryToEdit] = useState();
  const [isRemove, setRemove] = useState(false);

  useEffect(() => {
    //if id is passed, set product to edit
    if (id) {
      const findCategory = categories.find((x) => x.id === id);
      setCategoryToEdit(findCategory);
    }
  }, [id]);

  const onSubmit = (values) => {
    if (isRemove) {
      removeCategory({ id });
      onCloseModal();
      return;
    }

    if (id) {
      updateCategory({
        label: values.name,
        value: values.name,
        id,
      });
      onCloseModal();
    } else {
      const id = uuidv4();
      addCategory({
        label: values.name,
        value: values.name,
        id,
      });
      onCloseModal();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        title="Category name"
        name="name"
        defaultValue={categoryToEdit && categoryToEdit.label}
        ref={register({
          required: 'Required',
        })}
        isError={errors.name}
      />
      {errors.name && errors.name.message}
      <StyledWrapperBtn>
        <Button isActive type="submit">
          {categoryToEdit ? 'Save' : 'Add'}
        </Button>
        {categoryToEdit && (
          <Button onClick={() => setRemove(true)} warning isActive type="submit">
            Remove category
          </Button>
        )}
      </StyledWrapperBtn>
    </form>
  );
};

export default CategoryForm;
